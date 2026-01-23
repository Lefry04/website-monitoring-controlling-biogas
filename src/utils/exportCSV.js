export const exportToCSV = (data, filename) => {
  if (!data || data.length === 0) return;

  // ambil header dari key object
  const headers = Object.keys(data[0]);

  const csvRows = [];

  // header
  csvRows.push(headers.join(","));

  // data
  data.forEach(row => {
    const values = headers.map(header => {
      const value = row[header];

      // handle koma & enter
      if (value === null || value === undefined) return "";
      return `"${String(value).replace(/"/g, '""')}"`;
    });

    csvRows.push(values.join(","));
  });

  const csvString = csvRows.join("\n");

  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.csv`;
  link.click();

  URL.revokeObjectURL(url);
};
