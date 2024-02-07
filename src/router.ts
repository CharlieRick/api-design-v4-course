import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getUpdate,
  getUpdates,
  updateUpdate,
} from "./handlers/update";
import errorHandler from "./handlers/error";

const router = Router();

// Product
router.get("/product", getProducts);
router.get("/product/:id", getProduct);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  updateProduct
);
router.post(
  "/product",
  body("name").isString(),
  body("description").isString(),
  body("price").isFloat(),
  handleInputErrors,
  createProduct
);
router.delete("/product/:id", deleteProduct);

// Updates
router.get("/update", getUpdates);
router.get("/update/:id", getUpdate);
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").optional().isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
  body("version").optional(),
  handleInputErrors,
  updateUpdate
);
router.post(
  "/update",
  body("title").isString(),
  body("body").isString(),
  body("productId").isString(),
  handleInputErrors,
  createUpdate
);
router.delete("/update/:id", deleteUpdate);

// Update features
router.get("/update-feature", () => { });
router.get("/update-feature/:id", () => { });
router.put(
  "/update-feature/:id",
  body("name").optional(),
  body("description").optional(),
  () => { }
);
router.post(
  "/update-feature",
  body("name").isString(),
  body("description").isString(),
  body("updateId").isString(),
  () => { }
);
router.delete("/update-feature/:id", () => { });

router.use(errorHandler);

export default router;
