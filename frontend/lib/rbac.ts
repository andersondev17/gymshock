// Asegúrate de tener este tipo definido
declare namespace RBAC {
    type Role = 'admin' | 'trainer' | 'user';
}

export const checkAccess = (userRole: RBAC.Role, requiredRole: RBAC.Role): boolean => {
    const hierarchy: Record<RBAC.Role, RBAC.Role[]> = {
        admin: ['admin', 'trainer', 'user'],
        trainer: ['trainer', 'user'],
        user: ['user']
    };

    return hierarchy[userRole]?.includes(requiredRole) ?? false;
};