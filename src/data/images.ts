// Webmaister — abstract gradient placeholder colors for generated website previews.
// In production these would be real Supabase Storage URLs for user-uploaded screenshots.

export const PREVIEW_GRADIENTS = [
  'from-violet-500 to-purple-700',
  'from-pink-500 to-rose-600',
  'from-blue-500 to-indigo-700',
  'from-emerald-500 to-teal-700',
  'from-orange-400 to-rose-500',
  'from-slate-600 to-gray-800',
];

export function previewGradient(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return PREVIEW_GRADIENTS[Math.abs(hash) % PREVIEW_GRADIENTS.length];
}
