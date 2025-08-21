
export const formatPrice = (v) => `€${Number(v || 0).toFixed(2)}`;

export const formatReviews = (rating, reviews = []) => {
  const r = Number(rating ?? 0);
  const count = Array.isArray(reviews) ? reviews.length : 0;
  return `${r}(${count} Reviews)`;
};
