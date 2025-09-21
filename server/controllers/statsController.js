// controllers/statsController.js
import { connections } from "../services/connections.js";

function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export const getAllDatabaseStats = async (req, res) => {
  try {
    const results = [];

    for (const [dbName, conn] of Object.entries(connections)) {
      const client = conn.getClient();
      const db = client.db(conn.name);
      const stats = await db.stats();

      results.push({
        database: dbName,
        collections: stats.collections,
        objects: stats.objects,
        dataSize: stats.dataSize,
        storageSize: stats.storageSize,
        indexSize: stats.indexSize,
        utilized: stats.storageSize + stats.indexSize,
        utilizedFormatted: formatBytes(stats.storageSize + stats.indexSize),
      });
    }

    // Sum totals
    const totals = results.reduce(
      (acc, s) => {
        acc.collections += s.collections;
        acc.objects += s.objects;
        acc.dataSize += s.dataSize;
        acc.storageSize += s.storageSize;
        acc.indexSize += s.indexSize;
        acc.utilized += s.utilized;
        return acc;
      },
      { collections: 0, objects: 0, dataSize: 0, storageSize: 0, indexSize: 0, utilized: 0 }
    );

    // Cluster storage = 512 MB per cluster × 10 = 5 GB
    const totalLimit = 512 * 1024 * 1024 * 10; // in bytes
    const available = totalLimit - totals.utilized;

    res.json({
      success: true,
      totals: {
        collections: totals.collections,
        objects: totals.objects,
        dataSize: formatBytes(totals.dataSize),
        storageSize: formatBytes(totals.storageSize),
        indexSize: formatBytes(totals.indexSize),
        utilized: formatBytes(totals.utilized),
        totalLimit: formatBytes(totalLimit),
        available: formatBytes(available),
      },
      perDatabase: results,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch storage stats",
      error: err.message,
    });
  }
};
