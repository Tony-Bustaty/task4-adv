export function formatDate(isoString: string | null | undefined): string {
  if (!isoString) return "";

  const date = new Date(isoString);
  
  if (isNaN(date.getTime())) {
    console.warn(`Invalid date string provided: ${isoString}`);
    return "";
  }


  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}