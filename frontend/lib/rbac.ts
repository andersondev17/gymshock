
export type Role = 'admin' | 'trainer' | 'user';

export const checkAccess = (userRole: Role, requiredRole: Role): boolean => {
    const hierarchy: Record<Role, Role[]> = {
        admin: ['admin', 'trainer', 'user'],
        trainer: ['trainer', 'user'],
        user: ['user']
    };

    return hierarchy[userRole]?.includes(requiredRole) ?? false;
};