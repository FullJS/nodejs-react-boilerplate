const validator = require("validator");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');

const AccountPermission = require('./AccountPermission/model');

const privateKey = path.join(__dirname, '/keys/', 'private.key');
const publicKey = path.join(__dirname, '/keys/', 'public.pem');

const AccountSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        default: '',
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        default: '',
        required: true
    },
    local: {
        email: {
            type: String,
            trim: true,
            unique: true,
            default: ''
        },
        password: {
            type: String,
            trim: true,
            maxlength: 15,
            minlength: 8,
            required: true
        },
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }],
    permission: [{
        type: mongoose.Schema.ObjectId,
        ref: 'AccountPermission'
    }],
    locked: {
        type: Boolean,
        default: false,
    },
    enable: {
        type: Boolean,
        default: false,
    }
});


AccountSchema.methods.generateAuthToken = function () {
    let Account = this;

    let cert = fs.readFileSync(privateKey);
    let access = 'auth';
    let token = jwt.sign({
        access,
        _id: Account._id.toHexString(),
        firstName: Account.firstName,
        lastName: Account.lastName,
        permission: Account.permission,
    }, cert, { algorithm: 'RS256' });

    Account.tokens.push({ access, token });

    return Account.save().then(() => {
        return token;
    });
};

AccountSchema.statics.findByToken = function (token) {
    let Account = this;
    let decoded;

    let cert = fs.readFileSync(publicKey);

    try {
        decoded = jwt.verify(token, cert, { algorithms: ['RS256'] });
    } catch (e) {
        console.error(e);
        return Promise.reject(e);
    }

    return Account.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

AccountSchema.statics.findByCredentials = function (email, password) {
    let Account = this;

    let data = {
        email: email
    }

    let query = {
        _id: 1,
        firstName: 1,
        lastName: 1,
        local: {
            email: 1
        }
    }

    return Account.findOne(data, query).then((Account) => {
        return new Promise((resolve, reject) => {

            if (!Account) {
                reject(Account);
            }

            bcrypt.compare(password, Account.local.password, (e, res) => {
                if (res) {
                    resolve(Account);
                } else {
                    console.error(e);
                    reject(e);
                }
            });
        });
    });
};

AccountSchema.pre('save', function (next) {
    let Account = this;

    if (Account.isModified('local.password')) {
        let password = Account.local.password
        bcrypt.genSalt(1, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                Account.local.password = hash;
                next();
            })
        })

    } else {
        next();
    }
});

const Account = mongoose.model('Account', AccountSchema);

module.exports = { Account };