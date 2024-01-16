import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "./modules/middleware";

const router = Router();

// Product
router.get("/product", (req, res) => {
  res.json({ message: `hello friend, the password is: ${req.secret_key}` });
});
router.get("/product/:id", () => {});
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  () => {}
);
router.post("/product", body("name").isString(), handleInputErrors, () => {});
router.delete("/product/:id", () => {});

// Updates
router.get("/update", () => {});
router.get("/update/:id", () => {});
router.put(
  "/update/:id",
  body("title").optional(),
  body("name").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
  body("version").optional(),
  handleInputErrors,
  () => {}
);
router.post(
  "/update",
  body("title").isString(),
  body("name").isString(),
  handleInputErrors,
  () => {}
);
router.delete("/update/:id", () => {});

// Update features
router.get("/update-feature", () => {});
router.get("/update-feature/:id", () => {});
router.put(
  "/update-feature/:id",
  body("name").optional(),
  body("description").optional(),
  () => {}
);
router.post(
  "/update-feature",
  body("name").isString(),
  body("description").isString(),
  body("updateId").isString(),
  () => {}
);
router.delete("/update-feature/:id", () => {});

export default router;
