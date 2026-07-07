import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Search, Loader, ChevronDown, X, ExternalLink, Package, AlertCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { orderService } from '../../services/orderService';
import OrderStatusBadge from '../../components/orders/OrderStatusBadge';
import OrderTimeline from '../../components/orders/OrderTimeline';
import './admin-orders.css';

const STATUS_FILTERS = ['All', 'Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];

const STATUS_TRANSITIONS = {
  Pending: ['Confirmed', 'Cancelled'],
  Confirmed: ['Shipped', 'Cancelled'],
  Shipped: ['Delivered'],
  Delivered: [],
  Cancelled: [],
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-PK', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function formatCurrency(amount) {
  return `Rs.${(amount || 0).toLocaleString()}`;
}

export default function AdminOrders() {
  const navigate = useNavigate();
  const { user, token } = useSelector((s) => s.auth);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updating, setUpdating] = useState(null);

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    if (!isAdmin) {
      navigate('/');
      return;
    }
  }, [token, isAdmin, navigate]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await orderService.getAllOrders();
      setOrders(data.data || []);
    } catch (err) {
      toast.error('Failed to load orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin && token) fetchOrders();
  }, [isAdmin, token]);

  const filtered = useMemo(() => {
    let list = orders;

    if (search.trim()) {
      const term = search.trim().toLowerCase();
      list = list.filter((o) => {
        const name = o.user?.name || '';
        const email = o.user?.email || '';
        const orderNum = o.orderNumber || '';
        return (
          name.toLowerCase().includes(term) ||
          email.toLowerCase().includes(term) ||
          orderNum.toLowerCase().includes(term)
        );
      });
    }

    if (statusFilter !== 'All') {
      list = list.filter((o) => o.status === statusFilter);
    }

    return list;
  }, [orders, search, statusFilter]);

  const handleStatusUpdate = async (orderId, newStatus) => {
    setUpdating(orderId);
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o)),
      );
      if (selectedOrder?._id === orderId) {
        setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
      }
      toast.success(`Order status updated to "${newStatus}".`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update status');
    } finally {
      setUpdating(null);
    }
  };

  if (!token || !isAdmin) return null;

  if (loading) {
    return (
      <div className="ao-page">
        <div className="ao-container">
          <div className="ao-loading">
            <Loader size={24} className="spin" />
            <p>Loading orders...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ao-page">
      <div className="ao-container">
        <div className="ao-header">
          <div>
            <h1 className="ao-title">Orders</h1>
            <p className="ao-subtitle">
              {orders.length} {orders.length === 1 ? 'order' : 'orders'} total
            </p>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="ao-toolbar">
          <div className="ao-search-wrap">
            <Search size={16} className="ao-search-icon" />
            <input
              type="text"
              className="ao-search"
              placeholder="Search by order number, customer name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button type="button" className="ao-search-clear" onClick={() => setSearch('')}>
                <X size={14} />
              </button>
            )}
          </div>

          <div className="ao-filters">
            {STATUS_FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                className={`ao-filter-chip${statusFilter === f ? ' active' : ''}`}
                onClick={() => setStatusFilter(f)}
              >
                {f === 'All' ? 'All Orders' : f}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        {filtered.length === 0 ? (
          <div className="ao-empty">
            <Package size={40} strokeWidth={1} />
            <h3>No orders found</h3>
            <p>{search ? 'Try a different search term.' : 'No orders match the selected filter.'}</p>
          </div>
        ) : (
          <div className="ao-table-wrap">
            <table className="ao-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => (
                  <tr key={order._id} className="ao-row">
                    <td className="ao-cell-order">{order.orderNumber}</td>
                    <td className="ao-cell-customer">
                      <span className="ao-customer-name">{order.user?.name || 'N/A'}</span>
                      <span className="ao-customer-email">{order.user?.email || ''}</span>
                    </td>
                    <td className="ao-cell-date">{formatDate(order.createdAt)}</td>
                    <td className="ao-cell-total">{formatCurrency(order.total)}</td>
                    <td className="ao-cell-payment">
                      <span className={`ao-payment-dot ${order.paymentStatus === 'Paid' ? 'paid' : 'unpaid'}`} />
                      {order.paymentStatus}
                    </td>
                    <td className="ao-cell-status">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="ao-cell-action">
                      <button
                        type="button"
                        className="ao-view-btn"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <ExternalLink size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Mobile cards */}
        <div className="ao-mobile-list">
          {filtered.map((order) => (
            <div key={order._id} className="ao-mobile-card">
              <div className="ao-mobile-card-head">
                <span className="ao-mobile-order">{order.orderNumber}</span>
                <OrderStatusBadge status={order.status} />
              </div>
              <p className="ao-mobile-customer">{order.user?.name || 'N/A'}</p>
              <p className="ao-mobile-email">{order.user?.email || ''}</p>
              <div className="ao-mobile-meta">
                <span>{formatCurrency(order.total)}</span>
                <span className="ao-mobile-sep">|</span>
                <span className={`ao-payment-dot ${order.paymentStatus === 'Paid' ? 'paid' : 'unpaid'}`} />
                {order.paymentStatus}
                <span className="ao-mobile-sep">|</span>
                <span>{formatDate(order.createdAt)}</span>
              </div>
              <button
                type="button"
                className="ao-mobile-view"
                onClick={() => setSelectedOrder(order)}
              >
                <ExternalLink size={13} /> View Details
              </button>
            </div>
          ))}
        </div>

        {/* Details Modal */}
        {selectedOrder && (
          <div className="ao-modal-overlay" onClick={() => setSelectedOrder(null)}>
            <div className="ao-modal" onClick={(e) => e.stopPropagation()}>
              <div className="ao-modal-header">
                <div>
                  <h2 className="ao-modal-title">{selectedOrder.orderNumber}</h2>
                  <p className="ao-modal-date">{formatDate(selectedOrder.createdAt)}</p>
                </div>
                <button
                  type="button"
                  className="ao-modal-close"
                  onClick={() => setSelectedOrder(null)}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="ao-modal-body">
                {/* Timeline */}
                <section className="ao-modal-section">
                  <h4>Order Progress</h4>
                  <OrderTimeline status={selectedOrder.status} />
                </section>

                {/* Customer */}
                <section className="ao-modal-section">
                  <h4>Customer Information</h4>
                  <div className="ao-modal-detail-grid">
                    <div className="ao-modal-detail">
                      <span className="ao-modal-label">Name</span>
                      <span>{selectedOrder.user?.name || 'N/A'}</span>
                    </div>
                    <div className="ao-modal-detail">
                      <span className="ao-modal-label">Email</span>
                      <span>{selectedOrder.user?.email || 'N/A'}</span>
                    </div>
                  </div>
                </section>

                {/* Shipping */}
                <section className="ao-modal-section">
                  <h4>Shipping Address</h4>
                  <div className="ao-modal-address">
                    <p>{selectedOrder.address?.fullName}</p>
                    <p>{selectedOrder.address?.phone}</p>
                    <p>{selectedOrder.address?.streetAddress}</p>
                    <p>
                      {selectedOrder.address?.city}, {selectedOrder.address?.provinceState}{' '}
                      {selectedOrder.address?.postalCode}
                    </p>
                    <p>{selectedOrder.address?.country}</p>
                  </div>
                </section>

                {/* Products */}
                <section className="ao-modal-section">
                  <h4>Ordered Products ({selectedOrder.items?.length})</h4>
                  <div className="ao-modal-products">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="ao-modal-product">
                        <div className="ao-modal-product-info">
                          <span className="ao-modal-product-name">{item.name}</span>
                          <span className="ao-modal-product-variant">
                            {item.color} / {item.size} &times; {item.quantity}
                          </span>
                        </div>
                        <span className="ao-modal-product-price">
                          Rs.{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Payment */}
                <section className="ao-modal-section">
                  <h4>Payment Details</h4>
                  <div className="ao-modal-detail-grid">
                    <div className="ao-modal-detail">
                      <span className="ao-modal-label">Method</span>
                      <span>{selectedOrder.paymentMethod}</span>
                    </div>
                    <div className="ao-modal-detail">
                      <span className="ao-modal-label">Status</span>
                      <span className={`ao-modal-paid ao-modal-paid--${selectedOrder.paymentStatus === 'Paid' ? 'yes' : 'no'}`}>
                        {selectedOrder.paymentStatus}
                      </span>
                    </div>
                    <div className="ao-modal-detail">
                      <span className="ao-modal-label">Subtotal</span>
                      <span>{formatCurrency(selectedOrder.subtotal)}</span>
                    </div>
                    <div className="ao-modal-detail">
                      <span className="ao-modal-label">Shipping</span>
                      <span>{formatCurrency(selectedOrder.shipping)}</span>
                    </div>
                    <div className="ao-modal-detail">
                      <span className="ao-modal-label">Total</span>
                      <span className="ao-modal-total">{formatCurrency(selectedOrder.total)}</span>
                    </div>
                    {selectedOrder.stripePaymentIntent && (
                      <div className="ao-modal-detail ao-modal-detail-wide">
                        <span className="ao-modal-label">Stripe ID</span>
                        <span className="ao-modal-mono">{selectedOrder.stripePaymentIntent}</span>
                      </div>
                    )}
                  </div>
                </section>

                {/* Update Status */}
                {STATUS_TRANSITIONS[selectedOrder.status]?.length > 0 && (
                  <section className="ao-modal-section">
                    <h4>Update Status</h4>
                    <div className="ao-modal-status-actions">
                      {STATUS_TRANSITIONS[selectedOrder.status].map((nextStatus) => (
                        <button
                          key={nextStatus}
                          type="button"
                          className={`ao-status-btn ao-status-btn--${nextStatus.toLowerCase()}`}
                          disabled={updating === selectedOrder._id}
                          onClick={() => handleStatusUpdate(selectedOrder._id, nextStatus)}
                        >
                          {updating === selectedOrder._id ? (
                            <Loader size={14} className="spin" />
                          ) : (
                            `Mark as ${nextStatus}`
                          )}
                        </button>
                      ))}
                    </div>
                  </section>
                )}

                {STATUS_TRANSITIONS[selectedOrder.status]?.length === 0 && (
                  <section className="ao-modal-section">
                    <div className="ao-modal-final">
                      <AlertCircle size={16} />
                      <span>This order is in its final state. No further updates possible.</span>
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
