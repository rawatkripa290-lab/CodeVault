const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  createKnowledge,
  getKnowledge,
  updateKnowledge,
  deleteKnowledge
} = require("../controllers/knowledge.controller");

// CREATE
router.post("/", authMiddleware, createKnowledge);

// READ
router.get("/", authMiddleware, getKnowledge);

// UPDATE
router.patch("/:id", authMiddleware, updateKnowledge);

// DELETE
router.delete("/:id", authMiddleware, deleteKnowledge);

module.exports = router;