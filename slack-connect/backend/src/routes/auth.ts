import { Router } from "express";
import axios from "axios";
import dotenv from "dotenv";
import db from "../db";

dotenv.config();
const router = Router();

interface SlackOAuthResponse {
  ok: boolean;
  access_token: string;
  scope: string;
  team: {
    id: string;
    name: string;
  };
  bot_user_id: string;
  authed_user?: {
    id: string;
  };
  error?: string;
}

// Step 1: Redirect to Slack OAuth page
router.get("/connect", (req, res) => {
  const clientId = process.env.SLACK_CLIENT_ID;
  const redirectUri = encodeURIComponent(`${process.env.BASE_URL}/api/auth/callback`);
  const scope = "chat:write,channels:read";

  const slackAuthUrl = `https://slack.com/oauth/v2/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`;
  res.redirect(slackAuthUrl);
});

// Step 2: Handle OAuth callback
router.get("/callback", async (req, res) => {
  try {
    const code = req.query.code as string;
    if (!code) {
      return res.status(400).send("Missing code");
    }

    const tokenResponse = await axios.post<SlackOAuthResponse>(
      "https://slack.com/api/oauth.v2.access",
      null,
      {
        params: {
          code,
          client_id: process.env.SLACK_CLIENT_ID,
          client_secret: process.env.SLACK_CLIENT_SECRET,
          redirect_uri: `${process.env.BASE_URL}/api/auth/callback`
        }
      }
    );

    const data = tokenResponse.data;

    if (!data.ok) {
      return res.status(400).json({ error: data.error || "Slack OAuth failed" });
    }

    db.prepare(`
      INSERT INTO slack_tokens (team_id, team_name, access_token, bot_user_id)
      VALUES (?, ?, ?, ?)
    `).run(
      data.team.id,
      data.team.name,
      data.access_token,
      data.bot_user_id
    );

    res.send("✅ Slack app installed successfully! You can close this window.");
  } catch (err) {
    console.error(err);
    res.status(500).send("OAuth failed");
  }
});

export default router;
