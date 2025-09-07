import express from "express";
import cors from "cors";

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// 🔑 Map of channel keySets
const KEYS = {
  "NBA_Ph": {
    keyId: "f36eed9e95f140fabbc88a08abbeafff",
    key:   "0125600d0eb13359c28bdab4a2ebe75a"
  },
  "Celestial Movies Pinoy": {
    keyId: "0f8537d8412b11edb8780242ac120002",
    key:   "2ffd7230416150fd5196fd7ea71c36f3"
  },
  "A2Z": {
    keyId: "f703e4c8ec9041eeb5028ab4248fa094",
    key:   "c22f2162e176eee6273a5d0b68d19530"
  }
};

// Wrap Express in Vercel handler
app.get("/api/clearkey", (req, res) => {
  const channel = req.query.channel;
  if (!channel || !KEYS[channel]) {
    return res.status(404).json({ error: "Channel not found" });
  }

  const { keyId, key } = KEYS[channel];

  res.json({
    keys: [
      { kty: "oct", alg: "A128KW", kid: keyId, k: key }
    ]
  });
});

export default app;
