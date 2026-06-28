import api from "./api";

export async function getAppliedAstrologers() {
  const response = await api.get("/authorization/admin/get-all-applied-astrologers");
  return response.data;
}

export async function updateAstrologerStatus(astrologerId, status) {
  const response = await api.post("/authorization/admin/update-applied-astrologers-status", null, {
    params: { astrologerId, status }
  });
  return response.data;
}

export async function downloadDocument(fileId, fileType, filename) {
  const response = await api.get("/authorization/file/download-file", {
    params: { fileId, fileType },
    responseType: "arraybuffer"
  });
  const contentType = response.headers["content-type"] || "";
  const buffer = response.data;
  const bytes = new Uint8Array(buffer);
  const textPreview = new TextDecoder().decode(bytes.slice(0, 80));

  if (isTextResponse(contentType, textPreview)) {
    const text = new TextDecoder().decode(bytes);
    const parsed = parseJson(text);
    const base64Pdf = findBase64Pdf(parsed) || findBase64Pdf(text);

    if (base64Pdf) {
      saveBlob(base64ToBlob(base64Pdf, "application/pdf"), withExtension(filename, "pdf"));
      return;
    }

    throw new Error(parsed?.message || parsed?.error || text || "Download failed. File response was not a PDF.");
  }

  const extension = extensionFromContentType(contentType, textPreview, bytes);
  const blobType = contentType || (extension === "pdf" ? "application/pdf" : "application/octet-stream");
  const blob = new Blob([buffer], { type: blobType });

  saveBlob(blob, withExtension(filename, extension));
}

function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function isTextResponse(contentType, textPreview) {
  return contentType.includes("application/json") || contentType.startsWith("text/") || textPreview.trim().startsWith("{") || textPreview.trim().startsWith("[");
}

function extensionFromContentType(contentType, textPreview, bytes) {
  if (textPreview.includes("%PDF")) return "pdf";
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return "png";
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "jpg";
  if (textPreview.startsWith("RIFF") && textPreview.includes("WEBP")) return "webp";
  if (contentType.includes("application/pdf")) return "pdf";
  if (contentType.includes("png")) return "png";
  if (contentType.includes("jpeg") || contentType.includes("jpg")) return "jpg";
  if (contentType.includes("webp")) return "webp";
  return "pdf";
}

function withExtension(filename, extension) {
  const base = filename || "apsra-document";
  return base.replace(/\.[a-z0-9]+$/i, "") + `.${extension}`;
}

function parseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function findBase64Pdf(value) {
  if (!value) return null;
  if (typeof value === "string") {
    const cleaned = value.trim().replace(/^data:application\/pdf;base64,/, "");
    return cleaned.startsWith("JVBER") ? cleaned : null;
  }

  if (typeof value !== "object") return null;

  for (const key of ["data", "file", "content", "result", "base64", "fileData"]) {
    const found = findBase64Pdf(value[key]);
    if (found) return found;
  }

  return null;
}

function base64ToBlob(base64, type) {
  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return new Blob([bytes], { type });
}

export async function sendLoginCredentials() {
  // TODO: Integrate the backend email endpoint when it becomes available.
  return Promise.resolve({ skipped: true });
}
