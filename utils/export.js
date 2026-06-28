import * as XLSX from "xlsx";
import { getStatus, valueOrDash } from "./format";

const exportColumns = [
  ["displayName", "Display Name"],
  ["fullName", "Full Name"],
  ["email", "Email"],
  ["mobile", "Mobile"],
  ["dob", "DOB"],
  ["gender", "Gender"],
  ["religion", "Religion"],
  ["specialization", "Specialization"],
  ["experience", "Experience"],
  ["qualification", "Qualification"],
  ["languages", "Languages"],
  ["expertise", "Expertise"],
  ["city", "City"],
  ["state", "State"],
    ["profileStatus", "Status"]
];

export function rowsForExport(rows) {
  return rows.map((row) =>
    exportColumns.reduce((acc, [key, label]) => {
      acc[label] = key === "profileStatus" ? getStatus(row) : valueOrDash(row[key]);
      return acc;
    }, {})
  );
}

export function exportCsv(rows) {
  const prepared = rowsForExport(rows);
  const headers = Object.keys(prepared[0] || {});
  const csv = [
    headers.join(","),
    ...prepared.map((row) => headers.map((header) => `"${String(row[header] ?? "").replaceAll('"', '""')}"`).join(","))
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  triggerDownload(blob, "apsra-astrologers.csv");
}

export function exportExcel(rows) {
  const worksheet = XLSX.utils.json_to_sheet(rowsForExport(rows));
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Astrologers");
  XLSX.writeFile(workbook, "apsra-astrologers.xlsx");
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
