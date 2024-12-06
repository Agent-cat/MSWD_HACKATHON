require("dotenv").config();
const mongoose = require("mongoose");
const Template = require("../models/template.model");
const templates = require("../data/templates");
const User = require("../models/user.model");

async function seedTemplates() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Find admin user or create one
    let adminUser = await User.findOne({ email: "admin@example.com" });
    if (!adminUser) {
      adminUser = await User.create({
        username: "admin",
        email: "admin@example.com",
        password: "admin123",
      });
    }

    // Delete existing templates
    await Template.deleteMany({});
    console.log("Cleared existing templates");

    // Add createdBy field to templates
    const templatesWithCreator = templates.map((template) => ({
      ...template,
      createdBy: adminUser._id,
    }));

    // Insert new templates
    await Template.insertMany(templatesWithCreator);
    console.log("Templates seeded successfully");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding templates:", error);
    process.exit(1);
  }
}

seedTemplates();
