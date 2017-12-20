

var permissions = {
    type: 'user',
    roles: [{
        componentName: 'login',
        route: '/login',
        readOnly: true
    }]
};

db.AccountPermission.insert(permissions);
