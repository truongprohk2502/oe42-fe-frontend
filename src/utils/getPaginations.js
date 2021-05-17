export const getPaginations = (current, total) => {
  const pages = [];
  if (total > 5) {
    pages.push(1);
    pages.push(2);
    if (current >= 5) {
      pages.push("...");
    }
    if (current >= 4 && current !== total) {
      pages.push(current - 1);
    }
    if (current >= 3 && current <= total - 2) {
      pages.push(current);
    }
    if (current <= total - 3 && current >= 2) {
      pages.push(current + 1);
    }
    if (current <= total - 4) {
      pages.push("...");
    }
    pages.push(total - 1);
    pages.push(total);
  } else {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  }
  return pages;
};
