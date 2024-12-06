const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllTemplates,
  getTemplateById,
  createProjectFromTemplate,
} = require("../controllers/template.controller");

router.get("/", getAllTemplates);
router.get("/:id", getTemplateById);
router.post("/:id/create", authMiddleware, createProjectFromTemplate);

module.exports = router;
