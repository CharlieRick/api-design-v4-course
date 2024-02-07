import prisma from "../db";

// Get all products
export const getProducts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });

  res.json({ data: user.products });
};

// Get single product
export const getProduct = async (req, res) => {
  const product = await prisma.product.findFirst({
    where: {
      id: req.params.id,
      belongsToId: req.user.id,
    },
  });

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json({ data: product });
};

// Create product
export const createProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: {
        ...req.body,
        belongsToId: req.user.id,
      },
    });

    res.json({ data: product });
  } catch (e) {
    next(e);
  }
};

// Update product
export const updateProduct = async (req, res) => {
  const product = await prisma.product.update({
    where: {
      id: req.params.id,
      belongsToId: req.user.id,
    },
    data: req.body,
  });

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json({ data: product });
};

// Delete product
export const deleteProduct = async (req, res) => {
  const product = await prisma.product.delete({
    where: {
      id: req.params.id,
      belongsToId: req.user.id,
    },
  });

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json({ data: product });
};
