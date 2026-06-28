"use client";

import Swal from "sweetalert2";

export async function confirmAction({ title, text, confirmButtonText = "Confirm" }) {
  const result = await Swal.fire({
    title,
    text,
    icon: "question",
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText: "Cancel",
    confirmButtonColor: "#d39a2a",
    background: "#090b14",
    color: "#f8fafc"
  });

  return result.isConfirmed;
}
