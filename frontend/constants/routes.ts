// constants/routes.ts
export const ROUTES = {
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register'
  },
  PROGRAMS: {
    BASE: '/programs',
    MY_PROGRAM: '/programs/my-program',
    EVALUATION: '/programs/evaluation'
  },
  EXERCISES: {
    BASE: '/exercises',
    DETAIL: (id: string) => `/exercises/${id}`
  },
  ADMIN: {
    BASE: '/admin',
    USERS: '/admin/users',
    EXERCISES: '/admin/exercises'
  }
} as const;

// Helper para rutas con redirects
export const createRedirectUrl = (basePath: string, redirect?: string) => {
  if (!redirect) return basePath;
  return `${basePath}?redirect=${encodeURIComponent(redirect)}`;
};