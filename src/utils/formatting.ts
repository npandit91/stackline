// Helper functions for formatting
const formatDate = (date: string | Date) =>
  new Date(typeof date === "string" ? `${date}T00:00:00` : new Date(date))
    .toLocaleDateString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "-");

const formatMoney = (amount: string) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    Number(amount)
  );

export { formatDate, formatMoney };
