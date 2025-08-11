import { Router } from "express";
import axios from "axios";
import db from "../db";

const router = Router();

router.post("/send", async (req, res) => {
  try {
    const { channel, text } = req.body;
    const tokenRow = db.prepare(`SELECT access_token FROM slack_tokens LIMIT 1`).get();
    if (!tokenRow) {
      return res.status(400).json({ error: "No Slack token found. Connect first." });
    }

    const slackRes = await axios.post(
      "https://slack.com/api/chat.postMessage",
      { channel, text },
      { headers: { Authorization: `Bearer ${tokenRow.access_token}` } }
    );

    res.json(slackRes.data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to send message");
  }
});

export default router;
