export const formatLabel = (label: string) => {
  return label.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};
