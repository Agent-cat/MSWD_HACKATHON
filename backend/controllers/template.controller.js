const Template = require("../models/template.model");
const Project = require("../models/project.model");

exports.getAllTemplates = async (req, res) => {
  try {
    const templates = await Template.find().sort({ createdAt: -1 });
    res.json(templates);
  } catch (error) {
    console.error("Get templates error:", error);
    res.status(500).json({ message: "Error fetching templates" });
  }
};

exports.getTemplateById = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }
    res.json(template);
  } catch (error) {
    console.error("Get template error:", error);
    res.status(500).json({ message: "Error fetching template" });
  }
};

exports.createProjectFromTemplate = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    const project = new Project({
      name: req.body.name,
      elements: template.elements,
      user: req.user._id,
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error("Create from template error:", error);
    res.status(500).json({ message: "Error creating project from template" });
  }
};
