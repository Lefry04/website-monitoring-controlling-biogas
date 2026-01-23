import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel = (data, fileName) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(wb, ws, "Produksi");

  const buffer = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([buffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, `${fileName}.xlsx`);
};
