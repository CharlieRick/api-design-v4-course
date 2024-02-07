import { UPDATE_STATUSES, Update } from "@prisma/client";
import prisma from "../db";

// Get all updates
export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((acc, product) => {
    return [...acc, ...product.updates];
  }, [] as Update[]);

  res.json({ data: updates });
};

// Get single update
export const getUpdate = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
  });

  if (!update) {
    res.status(404);
    throw new Error("Update not found");
  }

  res.json({ data: update });
};

// Create update
export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  });

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      product: {
        connect: {
          id: product.id,
        },
      },
    },
  });

  res.json({ data: update });
};

// Update update
export const updateUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((acc, product) => {
    return [...acc, ...product.updates];
  }, [] as Update[]);

  const update = updates.find((update) => update.id === req.params.id);

  if (!update) {
    res.status(404);
    throw new Error("Update not found");
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id: update.id,
    },
    data: req.body,
  });

  res.json({ data: updatedUpdate });
};

// Delete update
export const deleteUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((acc, product) => {
    return [...acc, ...product.updates];
  }, [] as Update[]);

  const update = updates.find((update) => update.id === req.params.id);

  if (!update) {
    res.status(404);
    throw new Error("Update not found");
  }

  const deletedUpdate = await prisma.update.delete({
    where: {
      id: update.id,
    },
  });

  res.json({ data: deletedUpdate });
};
