const mongoose = require('mongoose');

const AccountPermissionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    role: [{
        componentName: {
            type: String,
            required: true
        },
        route: {
            type: String,
            required: true
        },
        readOnly: {
            type: Boolean,
            default: false
        }
    }]
});


const AccountPermission = mongoose.model('AccountPermission', AccountPermissionSchema);

module.exports = { AccountPermission };

