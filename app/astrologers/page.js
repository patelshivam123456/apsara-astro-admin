"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Download, FileSpreadsheet, Filter } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Search from "@/components/Search/Search";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import AstrologerTable from "@/components/Table/AstrologerTable";
import { downloadAstrologerDocument, fetchAstrologers, setSearch, setSelectedAstrologer, setStatusFilter } from "@/redux/astrologers/astrologerSlice";
import { exportCsv, exportExcel } from "@/utils/export";
import { DOCUMENT_TYPES, formatDate, getFileId, getStatus, valueOrDash } from "@/utils/format";

export default function AstrologersPage() {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const { astrologers, loading, filters, selectedAstrologer, downloading } = useSelector((state) => state.astrologers);

  useEffect(() => {
    dispatch(fetchAstrologers());
  }, [dispatch]);

  const filteredRows = useMemo(() => {
    const search = filters.search.toLowerCase().trim();
    return [...astrologers]
      .filter((item) => filters.status === "ALL" || getStatus(item) === filters.status)
      .filter((item) => {
        if (!search) return true;
        return [item.displayName, item.fullName, item.email, item.mobile, item.city, item.state, item.specialization, item.expertise]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(search);
      })
      .sort((a, b) => {
        const av = a[filters.sortBy] || "";
        const bv = b[filters.sortBy] || "";
        return filters.sortDirection === "asc" ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
      });
  }, [astrologers, filters]);

  const openView = () => setModalOpen(true);
  const closeView = () => {
    setModalOpen(false);
    dispatch(setSelectedAstrologer(null));
  };

  const download = (type) => {
    const fileId = getFileId(selectedAstrologer, type);
    if (!fileId) return;
    const documentType = DOCUMENT_TYPES.find((item) => item.key === type);
    dispatch(downloadAstrologerDocument({ fileId, fileType: documentType.fileType, filename: `${selectedAstrologer.displayName || selectedAstrologer.fullName || "apsra"}-${documentType.fileType}.pdf` }));
  };

  return (
    <ProtectedRoute>
      <div className="space-y-5">
        <section className="glass rounded-2xl p-4 shadow-soft">
          <div className="grid gap-3 xl:grid-cols-[1fr_auto_auto_auto_auto] xl:items-center">
            <Search value={filters.search} onChange={(value) => dispatch(setSearch(value))} placeholder="Search astrologers, cities, email, expertise" />
            <label className="relative">
              <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <select value={filters.status} onChange={(event) => dispatch(setStatusFilter(event.target.value))} className="h-11 w-full rounded-xl border border-slate-200 bg-white/80 pl-10 pr-8 text-sm text-slate-900 outline-none dark:border-white/10 dark:bg-[#24232d] dark:text-white xl:w-48">
                {["ALL", "PENDING", "APPROVED", "REJECTED"].map((status) => (
                  <option key={status} value={status} className="bg-white text-slate-900 dark:bg-[#24232d] dark:text-white">
                    {status}
                  </option>
                ))}
              </select>
            </label>
            <Button variant="secondary" onClick={() => exportCsv(filteredRows)}>
              <Download className="h-4 w-4" /> CSV
            </Button>
            <Button variant="secondary" onClick={() => exportExcel(filteredRows)}>
              <FileSpreadsheet className="h-4 w-4" /> Excel
            </Button>
            <Button onClick={() => dispatch(fetchAstrologers())}>Refresh</Button>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-soft dark:border-white/10 dark:bg-night">
          <AstrologerTable rows={filteredRows} loading={loading} onView={openView} />
        </section>

        <Modal open={modalOpen && Boolean(selectedAstrologer)} title={selectedAstrologer?.displayName || selectedAstrologer?.fullName || "Application Details"} onClose={closeView}>
          {selectedAstrologer ? (
            <div className="grid gap-5">
              <DetailSection title="Personal Information" items={[
                ["Full Name", selectedAstrologer.fullName],
                ["Email", selectedAstrologer.email],
                ["Mobile", selectedAstrologer.mobile],
                ["DOB", formatDate(selectedAstrologer.dob)],
                ["Gender", selectedAstrologer.gender]
              ]} />
              <DetailSection title="Address" items={[
                ["Address", selectedAstrologer.address],
                ["City", selectedAstrologer.city],
                ["State", selectedAstrologer.state],
                ["Country", selectedAstrologer.country],
                ["PinCode", selectedAstrologer.pinCode || selectedAstrologer.pincode]
              ]} />
              <DetailSection title="Professional" items={[
                ["Religion", selectedAstrologer.religion],
                ["Specialization", selectedAstrologer.specialization],
                ["Expertise", selectedAstrologer.expertise],
                ["Languages", selectedAstrologer.languages],
                ["Display Name", selectedAstrologer.displayName],
                ["Experience", selectedAstrologer.experience],
                ["Qualification", selectedAstrologer.qualification],
                ["Consultation Modes", selectedAstrologer.consultationModes]
              ]} />
              <section className="rounded-2xl border border-slate-200/70 p-4 dark:border-white/10">
                <h3 className="mb-3 font-bold">About</h3>
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{valueOrDash(selectedAstrologer.aboutYourself || selectedAstrologer.about)}</p>
              </section>
              <section className="rounded-2xl border border-slate-200/70 p-4 dark:border-white/10">
                <h3 className="mb-3 font-bold">Documents</h3>
                <div className="flex flex-wrap gap-2">
                  {DOCUMENT_TYPES.map((documentType) => {
                    const fileId = getFileId(selectedAstrologer, documentType.key);
                    return (
                      <Button key={documentType.key} variant="secondary" disabled={!fileId} loading={Boolean(downloading[`${fileId}-${documentType.fileType}`])} onClick={() => download(documentType.key)}>
                        <Download className="h-4 w-4" /> Download {documentType.label}
                      </Button>
                    );
                  })}
                </div>
              </section>
            </div>
          ) : null}
        </Modal>
      </div>
    </ProtectedRoute>
  );
}

function DetailSection({ title, items }) {
  return (
    <section className="rounded-2xl border border-slate-200/70 p-4 dark:border-white/10">
      <h3 className="mb-4 font-bold">{title}</h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(([label, value]) => (
          <div key={label} className="rounded-xl bg-slate-100/80 p-3 dark:bg-white/10">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{label}</p>
            <p className="mt-1 break-words text-sm font-semibold">{valueOrDash(value)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
