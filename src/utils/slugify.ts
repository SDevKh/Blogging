export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

export const ensureUniqueSlug = async (baseSlug: string, excludeId?: string): Promise<string> => {
  // For localStorage implementation, we'll check uniqueness locally
  const posts = JSON.parse(localStorage.getItem('blogcraft_posts') || '[]');
  const existingPost = posts.find((p: any) => p.slug === baseSlug && p.id !== excludeId);
  
  if (!existingPost) {
    return baseSlug;
  }
  
  // Generate a unique slug by appending a number
  let counter = 1;
  let uniqueSlug = `${baseSlug}-${counter}`;
  
  while (posts.find((p: any) => p.slug === uniqueSlug && p.id !== excludeId)) {
    counter++;
    uniqueSlug = `${baseSlug}-${counter}`;
  }
  
  return uniqueSlug;
};