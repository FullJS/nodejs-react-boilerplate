const _ = require('lodash');

const { Account } = require('./model');
const { ObjectID } = require('mongodb')

const { Sender } = require('../../email/sender');
const { Templater } = require('../../email/templater');

const create = (req, res) => {
    var body = _.pick(req.body, ['firstName', 'lastName', 'local',
        'facebook', 'twitter', 'google'
    ]);

    var account = new Account(body);

    account.save().then((doc) => {

        let validationLink = req.headers.host + "/account/validation/" + doc._id;

        let replace = {
            email: body.local.email,
            link: validationLink
        }

        Templater('accountCreate', replace).then((mail) => {
            Sender(body.local.email, mail).then(() => {
                return res.send({ cod: "SUCCESS_CREATE_ACCOUNT" })
            })
        }).catch((e) => {
            //Notificar administrador para desbloquear usuario manualmente
            console.error(e);
            return res.send({ cod: "SUCCESS_CREATE_ACCOUNT" })
        })

    }, (e) => {
        console.error(e);
        return res.status(400).send(e)
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
    }).catch((e) => res.status(400).send(e))
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
        }).catch((e) => { return res.status(400).send(e) });
};

const getList = (req, res) => {
    var limit = parseInt(req.params.limit, 10);
    var skip = parseInt(req.params.skip, 10);

    Account.find().skip(skip).limit(limit)
        .then((accountList) => {
            return res.send({ accountList })
        }), (e) => {
            return res.status(400).send(e)
        }
};

const count = (req, res) => {
    Account.count({})
        .then((counter) => {
            return res.send({ counter })
        }), (e) => {
            return res.status(400).send(e)
        }
};

const getById = (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send({ cod: 'INFO_ID_INVALID' })
    }

    Account.findById(id).then((account) => {
        if (!account) {
            return res.status(404).send({ cod: 'INFO_USER_NOT_FOUND' })
        }
        return res.send({ account })
    }).catch((e) => res.status(400).send(e));
};

const validation = (req, res) => {
    var id = parseInt(req.params.token, 20);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send({ cod: 'INFO_ID_INVALID' });
    }

    Account.findByIdAndUpdate(id, { $set: { enable: true } })
        .then((accountEdited) => {
            if (!accountEdited) {
                return res.status(404).send({ cod: 'INFO_USER_NOT_FOUND' });
            }
            return res.send({ cod: "SUCCESS_ENABLE_ACCOUNT" });
        }).catch((e) => {
            return res.status(400).send(e);
        });

}

module.exports = {
    create,
    remove,
    update,
    getList,
    count,
    getById,
    validation
};