// connections.js
import mongoose from "mongoose";
import { MONGO_URI_DB01 } from "../constants/constant.js";
import { MONGO_URI_DB02 } from "../constants/constant.js";
import { MONGO_URI_DB03 } from "../constants/constant.js";
import { MONGO_URI_DB04 } from "../constants/constant.js";
import { MONGO_URI_DB05 } from "../constants/constant.js";
import { MONGO_URI_DB06 } from "../constants/constant.js";
import { MONGO_URI_DB07 } from "../constants/constant.js";
import { MONGO_URI_DB08 } from "../constants/constant.js";
import { MONGO_URI_DB09 } from "../constants/constant.js";
import { MONGO_URI_DB10 } from "../constants/constant.js";

const dbUris = {
  db01: MONGO_URI_DB01,
  db02: MONGO_URI_DB02,
  db03: MONGO_URI_DB03,
  db04: MONGO_URI_DB04,
  db05: MONGO_URI_DB05,
  db06: MONGO_URI_DB06,
  db07: MONGO_URI_DB07,
  db08: MONGO_URI_DB08,
  db09: MONGO_URI_DB09,
  db10: MONGO_URI_DB10,
};

export const connections = {};

export const connectAllClusters = async () => {
  for (const [dbName, uri] of Object.entries(dbUris)) {
    if (!uri) throw new Error(`Missing URI for ${dbName}`);

    const conn = mongoose.createConnection(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    conn.on("connected", () => console.log(`✅ Connected to ${dbName}`));
    conn.on("error", (err) => console.error(`❌ Error on ${dbName}:`, err));

    connections[dbName] = conn;
  }
  return connections;
}
 