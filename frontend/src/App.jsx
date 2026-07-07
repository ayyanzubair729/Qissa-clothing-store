import { BrowserRouter as Router } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import AppRoutes from './routes/AppRoutes'; 

export default function App() {
  return (
    <Router>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </Router>
  );
}