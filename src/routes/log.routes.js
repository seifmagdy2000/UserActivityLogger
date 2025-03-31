import express from "express";
import Log from "../../domain/models/log.model.js";
import paginateResults from "../infrastructure/utils/pagination.js";

const router = express.Router();

router.get("/", fetchLogs);

async function fetchLogs(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const { startDate, endDate, search } = req.query;

    let filter = {};
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }
    if (search) {
      filter.message = { $regex: search, $options: "i" };
    }

    const paginatedLogs = await paginateResults(Log, page, limit, filter);

    res.json(paginatedLogs);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching logs", details: error.message });
  }
}

export default router;
