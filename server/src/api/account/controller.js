const _ = require('lodash');

const { Account } = require('./model');
const { AccountPermission } = require('./AccountPermission/model');
const { ObjectID } = require('mongodb')

const { Sender } = require('../../email/sender');
const { Templater } = require('../../email/templater');

const user = 'user';
const admin = 'admin';

const create = (req, res) => {
    var body = _.pick(req.body, ['firstName', 'lastName', 'local',
        'facebook', 'twitter', 'google'
    ]);

    var account = new Account(body);

    AccountPermission.findOne({ type: user }).select('_id').then((accountPermission) => {
        account.permission = accountPermission._id;

        account.save().then((doc) => {

            let validationLink = req.headers.host + "/account/token/validation/" + doc._id;

            let replace = {
                email: body.local.email,
                link: validationLink
            }

            Templater('accountCreate', replace).then((mail) => {
                Sender(body.local.email, mail).then(() => {
                    return res.send({ cod: "SUCCESS_CREATE_ACCOUNT" })
                }).catch((e) => {
                    //Notificar administrador para desbloquear usuario manualmente
                    console.error(e);
                    return res.send({ cod: "SUCCESS_CREATE_ACCOUNT" })
                })
            }).catch((e) => {
                //Notificar administrador para desbloquear usuario manualmente
                console.error(e);
                return res.send({ cod: "SUCCESS_CREATE_ACCOUNT" })
            })

        }, (e) => {
            let cod = "";
            if (e.code === 11000) {
                cod = "ERROR_EMAIL_ALREADY_REGISTERED";
            }
            if (cod) {
                return res.status(400).send({e, cod})    
            } else {
                return res.status(400).send(e)    
            }
            
        })
    })
};

const remove = (req, res) => {
    var id = req.params.id

    if (!ObjectID.isValid(id)) {
        return res.status(404).send({ cod: 'INFO_ID_INVALID' })
    }

    Account.findByIdAndRemove(id).then((account) => {
        if (!account) {
            return res.status(404).send({ cod: 'INFO_USER_NOT_FOUND' })
        }
        return res.send({ cod: "SUCCESS_REMOVE_ACCOUNT" })
    }).catch((e) => {
        console.error(e);
        return res.status(400).send(e)
    });
};

const update = (req, res) => {
    var body = _.pick(req.body, ['_id', 'firstName', 'lastName', 'local',
        'facebook', 'twitter', 'google', 'resetPasswordToken', 'resetPasswordExpires'
    ]);

    body.updated = Date.now;

    var account = new Account(body)
    id = account._id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send({ cod: 'INFO_ID_INVALID' })
    }

    Account.findByIdAndUpdate(id, { $set: account }, { new: true })
        .then((accountEdited) => {
            if (!accountEdited) {
                return res.status(404).send({ cod: 'INFO_USER_NOT_FOUND' })
            }
            return res.send({ cod: "SUCCESS_EDIT_ACCOUNT" })
        }).catch((e) => {
            console.error(e);
            return res.status(400).send(e)
        });
};

const getList = (req, res) => {
    var limit = parseInt(req.params.limit, 10);
    var skip = parseInt(req.params.skip, 10);

    Account.find().skip(skip).limit(limit).populate('permission')
        .then((accountList) => {
            return res.send({ accountList })
        }), (e) => {
            console.error(e);
            return res.status(400).send(e)
        }
};

const count = (req, res) => {
    Account.count({})
        .then((counter) => {
            return res.send({ counter })
        }), (e) => {
            console.error(e);
            return res.status(400).send(e)
        }
};

const getById = (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send({ cod: 'INFO_ID_INVALID' })
    }

    Account.findById(id).populate('permission').then((account) => {
        if (!account) {
            return res.status(404).send({ cod: 'INFO_USER_NOT_FOUND' })
        }
        return res.send({ account })
    }).catch((e) => {
        console.error(e);
        return res.status(400).send(e);
    });
};

const validation = (req, res) => {
    let id = req.params.token;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send({ cod: 'INFO_ID_INVALID' });
    }

    let _id = new ObjectID(id);

    Account.findByIdAndUpdate(_id, { $set: { enable: true } })
        .then((accountEdited) => {
            if (!accountEdited) {
                return res.status(404).send({ cod: 'INFO_USER_NOT_FOUND' });
            }
            return res.send({ cod: "SUCCESS_ENABLE_ACCOUNT" });
        }).catch((e) => {
            console.error(e);
            return res.status(400).send(e);
        });

}

const login = (req, res) => {
    let { credentials } = _.pick(req.body, ['credentials']);

    Account.findByCredentials(credentials.email, credentials.password).then((account) => {
        return account.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(account);
        })
    }).catch((e) => {
        res.status(400).send({ cod: "ERROR_INVALID_CREDENTIALS" });
    });
}

module.exports = {
    create,
    remove,
    update,
    getList,
    count,
    getById,
    validation,
    login
};