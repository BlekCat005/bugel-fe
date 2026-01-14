import "dotenv/config";
import cors from "cors";
import express from "express";
import multer from "multer";
import crypto from "crypto";
import mongoose from "mongoose";

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.DATABASE_URL;
const DB_NAME = process.env.DB_NAME || "bugel-info-hub";
const PLACEHOLDER_IMAGE = "https://placehold.co/800x450?text=Desa+Bugel";

if (!MONGO_URI) {
	console.warn("DATABASE_URL not set. Set it in .env for MongoDB connection.");
}

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

let connectPromise = null;
async function ensureDb() {
	if (mongoose.connection.readyState === 1) return;
	if (!connectPromise) {
		if (!MONGO_URI) throw new Error("DATABASE_URL env is required");
		connectPromise = mongoose.connect(MONGO_URI, { dbName: DB_NAME });
	}
	await connectPromise;
}

function schemaFactory(fields) {
	const schema = new mongoose.Schema(
		{
			_id: { type: String, default: () => crypto.randomUUID() },
			...fields,
		},
		{ timestamps: true }
	);

	schema.set("toJSON", {
		virtuals: true,
		versionKey: false,
		transform: (_doc, ret) => {
			ret.id = ret._id;
			delete ret._id;
			return ret;
		},
	});
	return schema;
}

const Berita = mongoose.model(
	"Berita",
	schemaFactory({
		judul: { type: String, required: true },
		ringkasan: { type: String, required: true },
		konten: { type: String, required: true },
		gambar: { type: String, default: PLACEHOLDER_IMAGE },
		tanggal: { type: String, required: true },
		penulis: { type: String, required: true },
	})
);

const Agenda = mongoose.model(
	"Agenda",
	schemaFactory({
		judul: { type: String, required: true },
		deskripsi: { type: String, required: true },
		tanggal: { type: String, required: true },
		waktu: { type: String, required: true },
		lokasi: { type: String, required: true },
	})
);

const Pengumuman = mongoose.model(
	"Pengumuman",
	schemaFactory({
		judul: { type: String, required: true },
		konten: { type: String, required: true },
		tanggal: { type: String, required: true },
		prioritas: { type: String, enum: ["tinggi", "sedang", "rendah"], required: true },
	})
);

const Galeri = mongoose.model(
	"Galeri",
	schemaFactory({
		judul: { type: String, required: true },
		gambar: { type: String, default: PLACEHOLDER_IMAGE },
		deskripsi: { type: String, required: true },
		tanggal: { type: String, required: true },
	})
);

const Kontak = mongoose.model(
	"Kontak",
	schemaFactory({
		nama: { type: String, required: true },
		email: { type: String, required: true },
		subjek: { type: String, required: true },
		pesan: { type: String, required: true },
		tanggal: { type: String, default: () => new Date().toISOString() },
	})
);

function pick(body, keys) {
	return keys.reduce((acc, key) => {
		if (body[key] !== undefined) acc[key] = body[key];
		return acc;
	}, {});
}

function toDataUri(file) {
	if (!file) return undefined;
	const mime = file.mimetype || "application/octet-stream";
	return `data:${mime};base64,${file.buffer.toString("base64")}`;
}

function resolveImage(req, fallback) {
	if (req.file) return toDataUri(req.file);
	if (req.body?.gambar) return req.body.gambar;
	return fallback;
}

function crudRoutes(name, Model, options) {
	const base = `/api/${name}`;

	app.get(base, async (_req, res) => {
		await ensureDb();
		const items = await Model.find().sort({ createdAt: -1 });
		res.json(items.map((i) => i.toJSON()));
	});

	app.get(`${base}/:id`, async (req, res) => {
		await ensureDb();
		const item = await Model.findById(req.params.id);
		if (!item) return res.status(404).json({ message: `${name} tidak ditemukan` });
		res.json(item.toJSON());
	});

	app.post(base, upload.single("file"), async (req, res) => {
		await ensureDb();
		const data = pick(req.body || {}, options.fields);
		if (options.allowImage) data.gambar = resolveImage(req, options.placeholder);
		try {
			const created = await Model.create(data);
			res.status(201).json(created.toJSON());
		} catch (err) {
			res.status(400).json({ message: err.message });
		}
	});

	app.put(`${base}/:id`, upload.single("file"), async (req, res) => {
		await ensureDb();
		const update = pick(req.body || {}, options.fields);
		if (options.allowImage) {
			const gambar = resolveImage(req);
			if (gambar) update.gambar = gambar;
		}
		const updated = await Model.findByIdAndUpdate(req.params.id, update, { new: true });
		if (!updated) return res.status(404).json({ message: `${name} tidak ditemukan` });
		res.json(updated.toJSON());
	});

	app.delete(`${base}/:id`, async (req, res) => {
		await ensureDb();
		const deleted = await Model.findByIdAndDelete(req.params.id);
		if (!deleted) return res.status(404).json({ message: `${name} tidak ditemukan` });
		res.status(204).send();
	});
}

crudRoutes("berita", Berita, {
	fields: ["judul", "ringkasan", "konten", "tanggal", "penulis"],
	allowImage: true,
	placeholder: PLACEHOLDER_IMAGE,
});

crudRoutes("agenda", Agenda, {
	fields: ["judul", "deskripsi", "tanggal", "waktu", "lokasi"],
	allowImage: false,
});

crudRoutes("pengumuman", Pengumuman, {
	fields: ["judul", "konten", "tanggal", "prioritas"],
	allowImage: false,
});

crudRoutes("galeri", Galeri, {
	fields: ["judul", "deskripsi", "tanggal"],
	allowImage: true,
	placeholder: PLACEHOLDER_IMAGE,
});

app.post("/api/kontak", async (req, res) => {
	await ensureDb();
	const { nama = "", email = "", subjek = "", pesan = "" } = req.body || {};
	const trimmed = {
		nama: nama.trim(),
		email: email.trim(),
		subjek: subjek.trim(),
		pesan: pesan.trim(),
	};
	if (!trimmed.nama || !trimmed.email || !trimmed.subjek || !trimmed.pesan) {
		return res.status(400).json({ message: "Semua field wajib diisi" });
	}
	const created = await Kontak.create({ ...trimmed, tanggal: new Date().toISOString() });
	res.status(201).json(created.toJSON());
});

app.get("/health", async (_req, res) => {
	const status = mongoose.connection.readyState === 1 ? "ok" : "connecting";
	res.json({ status });
});

app.listen(PORT, () => {
	console.log(`API server running on http://localhost:${PORT}`);
});
