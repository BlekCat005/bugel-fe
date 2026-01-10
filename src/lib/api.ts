import type { Agenda, Berita, GaleriFoto, Pengumuman } from "@/data/dummyData";

const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/$/, "");

const resolveMediaUrl = (url?: string) => {
  if (!url) return url;
  if (url.startsWith("/uploads/")) return `${API_BASE}${url}`;
  return url;
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const isFormData = options.body instanceof FormData;
  const headers = isFormData
    ? options.headers
    : {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      };

  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!response.ok) {
    const message = await safeErrorMessage(response);
    throw new Error(message);
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

async function safeErrorMessage(response: Response) {
  try {
    const data = await response.json();
    if (data?.message) return data.message as string;
    return `${response.status} ${response.statusText}`;
  } catch (err) {
    return `${response.status} ${response.statusText}`;
  }
}

export function getBerita() {
  return request<Berita[]>("/api/berita").then((items) =>
    items.map((item) => ({ ...item, gambar: resolveMediaUrl(item.gambar) }))
  );
}

export function getBeritaById(id: string) {
  return request<Berita>(`/api/berita/${id}`).then((item) => ({
    ...item,
    gambar: resolveMediaUrl(item.gambar),
  }));
}

export type CreateBeritaPayload = Omit<Berita, "id" | "gambar"> & {
  gambar?: string;
  file?: File | null;
};

export function createBerita(payload: CreateBeritaPayload) {
  const formData = new FormData();
  formData.append("judul", payload.judul);
  formData.append("ringkasan", payload.ringkasan);
  formData.append("konten", payload.konten);
  formData.append("tanggal", payload.tanggal);
  formData.append("penulis", payload.penulis);
  if (payload.file) {
    formData.append("file", payload.file);
  } else if (payload.gambar) {
    formData.append("gambar", payload.gambar);
  }

  return request<Berita>("/api/berita", {
    method: "POST",
    body: formData,
  }).then((item) => ({ ...item, gambar: resolveMediaUrl(item.gambar) }));
}

export function updateBerita(id: string, payload: Partial<CreateBeritaPayload>) {
  const formData = new FormData();
  if (payload.judul) formData.append("judul", payload.judul);
  if (payload.ringkasan) formData.append("ringkasan", payload.ringkasan);
  if (payload.konten) formData.append("konten", payload.konten);
  if (payload.tanggal) formData.append("tanggal", payload.tanggal);
  if (payload.penulis) formData.append("penulis", payload.penulis);
  if (payload.file) {
    formData.append("file", payload.file);
  } else if (payload.gambar) {
    formData.append("gambar", payload.gambar);
  }

  return request<Berita>(`/api/berita/${id}`, {
    method: "PUT",
    body: formData,
  }).then((item) => ({ ...item, gambar: resolveMediaUrl(item.gambar) }));
}

export function deleteBerita(id: string) {
  return request<void>(`/api/berita/${id}`, { method: "DELETE" });
}

export function getAgenda() {
  return request<Agenda[]>("/api/agenda");
}

export function createAgenda(payload: Omit<Agenda, "id">) {
  return request<Agenda>("/api/agenda", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateAgenda(id: string, payload: Partial<Agenda>) {
  return request<Agenda>(`/api/agenda/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteAgenda(id: string) {
  return request<void>(`/api/agenda/${id}`, { method: "DELETE" });
}

export function getPengumuman() {
  return request<Pengumuman[]>("/api/pengumuman");
}

export function createPengumuman(payload: Omit<Pengumuman, "id">) {
  return request<Pengumuman>("/api/pengumuman", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updatePengumuman(id: string, payload: Partial<Pengumuman>) {
  return request<Pengumuman>(`/api/pengumuman/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deletePengumuman(id: string) {
  return request<void>(`/api/pengumuman/${id}`, { method: "DELETE" });
}

export function getGaleri() {
  return request<GaleriFoto[]>("/api/galeri").then((items) =>
    items.map((item) => ({ ...item, gambar: resolveMediaUrl(item.gambar) }))
  );
}

export function getGaleriById(id: string) {
  return request<GaleriFoto>(`/api/galeri/${id}`).then((item) => ({
    ...item,
    gambar: resolveMediaUrl(item.gambar),
  }));
}

export type CreateGaleriPayload = {
  judul: string;
  deskripsi: string;
  tanggal?: string;
  gambar?: string;
  file?: File | null;
};

export function createGaleri(payload: CreateGaleriPayload) {
  const formData = new FormData();
  formData.append("judul", payload.judul);
  formData.append("deskripsi", payload.deskripsi);
  if (payload.tanggal) formData.append("tanggal", payload.tanggal);
  if (payload.file) {
    formData.append("file", payload.file);
  } else if (payload.gambar) {
    formData.append("gambar", payload.gambar);
  }

  return request<GaleriFoto>("/api/galeri", {
    method: "POST",
    body: formData,
  }).then((item) => ({ ...item, gambar: resolveMediaUrl(item.gambar) }));
}

export function updateGaleri(id: string, payload: CreateGaleriPayload) {
  const formData = new FormData();
  if (payload.judul) formData.append("judul", payload.judul);
  if (payload.deskripsi) formData.append("deskripsi", payload.deskripsi);
  if (payload.tanggal) formData.append("tanggal", payload.tanggal);
  if (payload.file) {
    formData.append("file", payload.file);
  } else if (payload.gambar) {
    formData.append("gambar", payload.gambar);
  }

  return request<GaleriFoto>(`/api/galeri/${id}`, {
    method: "PUT",
    body: formData,
  }).then((item) => ({ ...item, gambar: resolveMediaUrl(item.gambar) }));
}

export function deleteGaleri(id: string) {
  return request<void>(`/api/galeri/${id}`, { method: "DELETE" });
}
