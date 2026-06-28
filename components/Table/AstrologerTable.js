"use client";

import { ArrowUpDown, Download, Eye, FileDown, ShieldCheck, ShieldX } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/Button/Button";
import EmptyState from "@/components/EmptyState/EmptyState";
import Pagination from "@/components/Pagination/Pagination";
import StatusBadge from "@/components/StatusBadge/StatusBadge";
import { TableSkeleton } from "@/components/Loader/Loader";
import { confirmAction } from "@/components/ConfirmDialog/ConfirmDialog";
import { changeAstrologerStatus, downloadAstrologerDocument, setPage, setPageSize, setSelectedAstrologer, setSort } from "@/redux/astrologers/astrologerSlice";
import { DOCUMENT_TYPES, formatDate, getFileId, getStatus, valueOrDash } from "@/utils/format";

const columns = [
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

export default function AstrologerTable({ rows, loading, onView }) {
  const dispatch = useDispatch();
  const { pagination, updating, downloading } = useSelector((state) => state.astrologers);
  const start = (pagination.page - 1) * pagination.pageSize;
  const pageRows = rows.slice(start, start + pagination.pageSize);

  const updateStatus = async (row, status) => {
    const isApproval = status === "APPROVED";
    const confirmed = await confirmAction({
      title: `${isApproval ? "Approve" : "Reject"} application?`,
      text: row.fullName || row.displayName || "This application will be updated immediately.",
      confirmButtonText: isApproval ? "Yes, approve" : "Yes, reject"
    });
    if (confirmed) {
      dispatch(changeAstrologerStatus({ publicId: row.publicId, status }));
    }
  };

  const download = (row, type) => {
    const fileId = getFileId(row, type);
    if (!fileId) return;
    const documentType = DOCUMENT_TYPES.find((item) => item.key === type);
    dispatch(downloadAstrologerDocument({ fileId, fileType: documentType.fileType, filename: `${row.displayName || row.fullName || "apsra"}-${documentType.fileType}.pdf` }));
  };

  if (loading) return <TableSkeleton rows={8} cols={8} />;
  if (!rows.length) return <EmptyState title="No applications found" message="New astrologer applications will appear here." />;

  return (
    <>
      <div className="subtle-scrollbar overflow-x-auto">
        <table className="min-w-[1680px] w-full border-separate border-spacing-0 text-left text-sm">
          <thead className="sticky top-0 z-10 bg-slate-100/95 dark:bg-[#111421]/95">
            <tr>
              <th className="whitespace-nowrap px-4 py-4 font-bold">Photo</th>
              {columns.map(([key, label]) => (
                <th key={key} className="whitespace-nowrap px-4 py-4 font-bold">
                  <button onClick={() => dispatch(setSort(key))} className="inline-flex items-center gap-2 hover:text-gold-500">
                    {label}
                    <ArrowUpDown className="h-3.5 w-3.5" />
                  </button>
                </th>
              ))}
              <th className="sticky right-0 whitespace-nowrap bg-slate-100/95 px-4 py-4 font-bold dark:bg-[#111421]/95">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row) => {
              const status = getStatus(row);
              const rowUpdating = updating[row.publicId];
              return (
                <tr key={row.publicId || row.email} className="border-b border-slate-200/70 transition hover:bg-gold-500/5 dark:border-white/10">
                  <td className="px-4 py-4">
                    <img src={row.photo || row.profilePhoto || "/logo.png"} alt={row.displayName || "Astrologer"} className="h-11 w-11 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-white/10" />
                  </td>
                  {columns.map(([key]) => (
                    <td key={key} className="max-w-52 whitespace-nowrap px-4 py-4 text-slate-600 dark:text-slate-300">
                      {key === "dob" ? formatDate(row[key]) : key === "profileStatus" ? <StatusBadge status={getStatus(row)} /> : valueOrDash(row[key])}
                    </td>
                  ))}
                  <td className="sticky right-0 bg-white px-4 py-4 dark:bg-night">
                    <div className="flex min-w-[410px] flex-wrap gap-2">
                      <Button variant="secondary" className="min-h-9 px-3" onClick={() => { dispatch(setSelectedAstrologer(row)); onView(row); }}>
                        <Eye className="h-4 w-4" /> View
                      </Button>
                      <Button variant="success" className="min-h-9 px-3" disabled={status === "APPROVED"} loading={rowUpdating === "APPROVED"} onClick={() => updateStatus(row, "APPROVED")}>
                        <ShieldCheck className="h-4 w-4" /> Approve
                      </Button>
                      <Button variant="danger" className="min-h-9 px-3" disabled={status === "REJECTED"} loading={rowUpdating === "REJECTED"} onClick={() => updateStatus(row, "REJECTED")}>
                        <ShieldX className="h-4 w-4" /> Unapprove
                      </Button>
                      {DOCUMENT_TYPES.map((documentType) => {
                        const fileId = getFileId(row, documentType.key);
                        return (
                          <Button key={documentType.key} variant="ghost" className="min-h-9 px-3" disabled={!fileId} loading={Boolean(downloading[`${fileId}-${documentType.fileType}`])} onClick={() => download(row, documentType.key)}>
                            {documentType.key === "aadhaar" ? <Download className="h-4 w-4" /> : <FileDown className="h-4 w-4" />}
                            {documentType.label}
                          </Button>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination page={pagination.page} pageSize={pagination.pageSize} total={rows.length} onPageChange={(page) => dispatch(setPage(page))} onPageSizeChange={(size) => dispatch(setPageSize(size))} />
    </>
  );
}
