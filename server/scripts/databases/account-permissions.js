// var key = {'type':'user'}
// var permissions = {
//     type: 'user',
//     roles: [{
//         componentName: 'login',
//         route: '/login',
//         readOnly: true
//     }]
// };
// db.AccountPermission.update(key, permissions, upsert=true);

var permissions = {
    type: 'user',
    roles: [{
        componentName: 'login',
        route: '/login',
        readOnly: true
    }]
};

db.AccountPermission.insert(permissions);
