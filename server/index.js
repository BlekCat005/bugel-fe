import cors from "cors";
import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 4000;
const DATA_PATH = path.join(__dirname, "data", "db.json");
const UPLOAD_DIR = path.join(__dirname, "uploads");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(UPLOAD_DIR));

await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
await fs.mkdir(UPLOAD_DIR, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname) || ".bin";
      cb(null, `${Date.now()}-${crypto.randomUUID()}${ext}`);
    },
  }),
});

const placeholderImage = "https://placehold.co/800x450?text=Desa+Bugel";

async function readDb() {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return {
      berita: parsed.berita || [],
      agenda: parsed.agenda || [],
      pengumuman: parsed.pengumuman || [],
      galeri: parsed.galeri || [],
    };
  } catch (err) {
    if (err.code === "ENOENT") {
      const emptyDb = { berita: [], agenda: [], pengumuman: [], galeri: [] };
      await writeDb(emptyDb);
      return emptyDb;
    }
    throw err;
  }
}

async function writeDb(db) {
  await fs.writeFile(DATA_PATH, JSON.stringify(db, null, 2), "utf8");
}

const conditionalUpload = (req, res, next) => {
  const contentType = req.headers["content-type"] || "";
  if (contentType.includes("multipart/form-data")) {
    return upload.single("file")(req, res, (err) => {
      if (err) return res.status(400).json({ message: err.message });
      return next();
    });
  }
  return next();
};

function createCrudRoutes(resource) {
  const base = `/api/${resource}`;

  app.get(base, async (_req, res) => {
    const db = await readDb();
    res.json(db[resource] || []);
  });

  app.get(`${base}/:id`, async (req, res) => {
    const db = await readDb();
    const item = (db[resource] || []).find((entry) => entry.id === req.params.id);
    if (!item) return res.status(404).json({ message: `${resource} tidak ditemukan` });
    res.json(item);
  });

  app.post(base, conditionalUpload, async (req, res) => {
    const db = await readDb();
    const payload = req.body || {};
    const filePath = req.file ? `/uploads/${req.file.filename}` : payload.gambar;

    if (resource === "berita" && !filePath) {
      return res.status(400).json({ message: "Gambar wajib diunggah" });
    }

    const newItem = {
      ...payload,
      gambar: filePath || placeholderImage,
      id: crypto.randomUUID(),
    };
    db[resource] = [...(db[resource] || []), newItem];
    await writeDb(db);
    res.status(201).json(newItem);
  });

  app.put(`${base}/:id`, conditionalUpload, async (req, res) => {
    const db = await readDb();
    const list = db[resource] || [];
    const index = list.findIndex((entry) => entry.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: `${resource} tidak ditemukan` });

    const incomingPath = req.file ? `/uploads/${req.file.filename}` : req.body?.gambar;
    const updated = {
      ...list[index],
      ...req.body,
      id: list[index].id,
      gambar: incomingPath || list[index].gambar || placeholderImage,
    };

    db[resource][index] = updated;
    await writeDb(db);
    res.json(updated);
  });

  app.delete(`${base}/:id`, async (req, res) => {
    const db = await readDb();
    const list = db[resource] || [];
    const exists = list.some((entry) => entry.id === req.params.id);
    if (!exists) return res.status(404).json({ message: `${resource} tidak ditemukan` });
    db[resource] = list.filter((entry) => entry.id !== req.params.id);
    await writeDb(db);
    res.status(204).send();
  });
}

app.get("/api/galeri", async (_req, res) => {
  const db = await readDb();
  res.json(db.galeri || []);
});

app.get("/api/galeri/:id", async (req, res) => {
  const db = await readDb();
  const item = (db.galeri || []).find((entry) => entry.id === req.params.id);
  if (!item) return res.status(404).json({ message: "Galeri tidak ditemukan" });
  res.json(item);
});

app.post("/api/galeri", conditionalUpload, async (req, res) => {
  const db = await readDb();
  const { judul, deskripsi, tanggal } = req.body;
  const filePath = req.file ? `/uploads/${req.file.filename}` : req.body?.gambar;

  if (!judul || !deskripsi) {
    return res.status(400).json({ message: "Judul dan deskripsi wajib diisi" });
  }

  const newItem = {
    id: crypto.randomUUID(),
    judul,
    deskripsi,
    tanggal: tanggal || new Date().toISOString().split("T")[0],
    gambar: filePath || placeholderImage,
  };

  db.galeri = [...(db.galeri || []), newItem];
  await writeDb(db);
  res.status(201).json(newItem);
});

app.put("/api/galeri/:id", conditionalUpload, async (req, res) => {
  const db = await readDb();
  const list = db.galeri || [];
  const index = list.findIndex((entry) => entry.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Galeri tidak ditemukan" });

  const previous = list[index];
  const incomingPath = req.file ? `/uploads/${req.file.filename}` : req.body?.gambar;
  const updated = {
    ...previous,
    ...req.body,
    gambar: incomingPath || previous.gambar || placeholderImage,
    id: previous.id,
  };

  db.galeri[index] = updated;
  await writeDb(db);
  res.json(updated);
});

app.delete("/api/galeri/:id", async (req, res) => {
  const db = await readDb();
  const list = db.galeri || [];
  const index = list.findIndex((entry) => entry.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Galeri tidak ditemukan" });

  const [removed] = list.splice(index, 1);
  db.galeri = list;
  await writeDb(db);

  if (removed?.gambar && removed.gambar.startsWith("/uploads/")) {
    const absolutePath = path.join(UPLOAD_DIR, path.basename(removed.gambar));
    fs.unlink(absolutePath).catch(() => {});
  }

  res.status(204).send();
});

["berita", "agenda", "pengumuman"].forEach(createCrudRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
