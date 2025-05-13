module.exports = {
    hierarchy: {
        admin: ['admin', 'trainer', 'user'],
        trainer: ['trainer', 'user'],
        user: ['user']
    },
    checkAccess: (userRole, requiredRole) => {
        return module.exports.hierarchy[userRole]?.includes(requiredRole) || false;
    }
};