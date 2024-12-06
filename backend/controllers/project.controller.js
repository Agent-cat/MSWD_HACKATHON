const Project = require("../models/project.model");

exports.getAllProjects = async (req, res) => {
  try {
    console.log("Fetching projects for user:", req.user._id);
    const projects = await Project.find({ user: req.user._id }).sort({
      lastModified: -1,
    });
    console.log("Found projects:", projects.length);
    res.json(projects);
  } catch (error) {
    console.error("Get all projects error:", error);
    res.status(500).json({ message: "Error fetching projects" });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    console.error("Get project by ID error:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid project ID format" });
    }
    res
      .status(500)
      .json({ message: "Internal server error while fetching project" });
  }
};

exports.createProject = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ message: "Project name is required" });
    }

    const project = new Project({
      ...req.body,
      user: req.user._id,
      lastModified: new Date(),
    });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error("Create project error:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "Internal server error while creating project" });
  }
};

exports.updateProject = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { ...req.body, lastModified: new Date() },
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    console.error("Update project error:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid project ID format" });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res
      .status(500)
      .json({ message: "Internal server error while updating project" });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Delete project error:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid project ID format" });
    }
    res
      .status(500)
      .json({ message: "Internal server error while deleting project" });
  }
};
