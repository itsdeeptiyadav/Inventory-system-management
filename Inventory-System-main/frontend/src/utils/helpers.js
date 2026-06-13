export function formatCurrency(
  amount
) {

  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR"
    }
  ).format(amount);

}

export function capitalize(
  text
) {

  if (!text) return "";

  return (
    text.charAt(0)
    .toUpperCase()
    +
    text.slice(1)
  );

}

export function formatDate(
  date
) {

  return new Date(date)
    .toLocaleDateString();

}