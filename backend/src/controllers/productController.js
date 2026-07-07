import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully.",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      subCategory,
      fabric,
      featured,
      newArrival,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 8,
    } = req.query;

    const query = {};

    // Search
    if (search) {
      query.name = {
        $regex: search,
        $options: "i",
      };
    }

    // Category
    if (category) {
      query.category = category;
    }

    // Sub Category
    if (subCategory) {
      query.subCategory = subCategory;
    }

    // Fabric
    if (fabric) {
      query.fabric = fabric;
    }

    // Featured
    if (featured === "true") {
      query.isFeatured = true;
    }

    // New Arrivals
    if (newArrival === "true") {
      query.isNewArrival = true;
    }

    // Price Range
    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }

    // Sorting
    let sortOption = {};

    switch (sort) {
      case "price":
        sortOption.price = 1;
        break;

      case "-price":
        sortOption.price = -1;
        break;

      case "rating":
        sortOption.rating = -1;
        break;

      case "name":
        sortOption.name = 1;
        break;

      default:
        sortOption.createdAt = -1;
    }

    const currentPage = Number(page);
    const pageLimit = Number(limit);

    const skip = (currentPage - 1) * pageLimit;

    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(pageLimit);

    const totalProducts = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      totalProducts,
      currentPage,
      totalPages: Math.ceil(totalProducts / pageLimit),
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};