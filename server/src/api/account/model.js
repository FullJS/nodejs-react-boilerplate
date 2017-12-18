const validator = require("validator");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
var fs = require('fs');

const AccountPermission = require('./AccountPermission/model');

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
            default: '',
            validate: {
                validator: validator.isEmail,
                message: '{VALUE} is not a valid e-mail'
            }
        },
        password: {
            type: String,
            trim: true,
            maxlength: 15,
            minlength: 6,
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
    bloqueado: {
        type: Boolean,
        default: false
    },
    visitas: {
        type: Number,
        default: 0
    },
    sexo: {
        type: String
    },
    imagemPerfil: {
        type: String
    },
    dataCriacaoConta: {
        type: Date,
        default: Date.now
    },
    dataNascimento: {
        type: Date,
        default: Date.now
    },
    hashConfirmacao: {
        type: String
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
    }]
});


AccountSchema.methods.generateAuthToken = function () {
    var Account = this;

    var cert = fs.readFileSync('server/keys/Account.private_key.pem');
    var access = 'auth';
    var token = jwt.sign({
        access,
        _id: Account._id.toHexString(),
        nomeCompleto: Account.nomeCompleto,
        imagemPerfil: Account.imagemPerfil,
        userType: 'Account',
    }, cert, { algorithm: 'RS256' });

    let tokenAuth = Account.tokens.filter((t) => {
        if (t.access === 'auth') {
            t.token = token;
            return true;
        }

        return false;
    });

    if (tokenAuth.length === 0) {
        Account.tokens.push({ access, token });
    }

    return Account.save().then(() => {
        return token;
    });
};

AccountSchema.statics.findByToken = function (token) {
    var Account = this;
    var decoded;

    var cert = fs.readFileSync('server/keys/Account.public_key.pem');

    try {
        decoded = jwt.verify(token, cert, { algorithms: ['RS256'] });
    } catch (e) {
        console.log(e);
        return Promise.reject(e);
    }

    return Account.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

AccountSchema.statics.findByCredentials = function (email, login, senha) {
    var Account = this;

    let data;
    if (login) {
        data = { login };
    } else {
        data = { email };
    }

    let query = {
        _id: 1,
        bloqueado: 1,
        email: 1,
        nomeCompleto: 1,
        tokens: 1,
        imagemPerfil: 1,
        senha: 1
    }

    return Account.findOne(data, query).then((Account) => {

        if (!Account) {
            return Promise.reject(Account);
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(senha, Account.senha, (err, res) => {
                if (res) {
                    resolve(Account);
                } else {
                    reject();
                }
            });
        });
    });
};

AccountSchema.pre('save', function (next) {
    var Account = this;

    if (Account.isModified('senha')) {
        var senha = Account.senha
        bcrypt.genSalt(1, (err, salt) => {
            bcrypt.hash(senha, salt, (err, hash) => {
                Account.senha = hash;
                next();
            })
        })

    } else {
        next();
    }
});

const Account = mongoose.model('Account', AccountSchema);

module.exports = { Account };