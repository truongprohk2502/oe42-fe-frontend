export const getAverageRating = (ratings) =>
  ratings.reduce((total, item) => (total += item.rating), 0) / ratings.length;
