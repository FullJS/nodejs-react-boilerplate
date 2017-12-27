var key = {'type':'user'}
var permissions = {
    type: 'user',
    roles: [{
        componentName: 'login',
        route: '/login',
        readOnly: true
    },{
        componentName: 'register',
        route: '/register',
        readOnly: true
    }]
};

db.accountpermissions.update(key, permissions, upsert=true);

//var permissions = {
//    type: 'user',
//    roles: [{
//        componentName: 'login',
//        route: '/login',
//        readOnly: true
//    }]
//};
//
//db.AccountPermission.insert(permissions);
