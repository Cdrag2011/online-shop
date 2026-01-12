// src/utils/img.ts
export const img = (path: string): string => {
  if (!path) return "";
  // merge în DEV + BUILD + GitHub Pages (BASE_URL)
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
};
