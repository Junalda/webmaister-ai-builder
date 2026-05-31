export const PLAN_CREDITS: Record<string, number> = {
  free: 10,
  starter: 50,
  pro: 200,
  agency: 500,
};

export const PLAN_PROJECT_LIMIT: Record<string, number> = {
  free: 1,
  starter: 3,
  pro: Infinity,
  agency: Infinity,
};

export const ROUTES = {
  home: '/',
  login: '/login',
  signup: '/signup',
  pricing: '/pricing',
  dfy: '/done-for-you',
  dashboard: '/dashboard',
  newProject: '/dashboard/new-project',
  project: (id: string) => `/dashboard/projects/${id}`,
  admin: '/admin',
} as const;
