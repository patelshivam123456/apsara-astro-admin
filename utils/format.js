export function valueOrDash(value) {
  if (Array.isArray(value)) return value.length ? value.join(", ") : "-";
  return value || value === 0 ? value : "-";
}

export function formatDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(date);
}

export const DOCUMENT_TYPES = [
  {
    key: "aadhaar",
    label: "Aadhaar",
    fileType: "aadhaar",
    uuidField: "aadhaarFileUuid"
  },
  {
    key: "educationalQualification",
    label: "Education",
    fileType: "educationalQualification",
    uuidField: "educationalQualificationFileUuid"
  },
  {
    key: "experience",
    label: "Experience",
    fileType: "experience",
    uuidField: "experienceFileUuid"
  }
];

export function getStatus(value) {
  const rawStatus = typeof value === "object" && value !== null ? value.profileStatus || value.status : value;
  return (rawStatus || "PENDING").toString().toUpperCase();
}

export function getFileId(astrologer, type) {
  const documentType = DOCUMENT_TYPES.find((item) => item.key === type || item.fileType === type);

  return (
    astrologer?.[documentType?.uuidField] ||
    astrologer?.[`${type}FileId`] ||
    astrologer?.[`${type}Id`] ||
    astrologer?.documents?.[type]?.fileId ||
    astrologer?.documents?.[type]?.id ||
    astrologer?.[type]
  );
}
