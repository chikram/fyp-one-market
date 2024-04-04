const { authModel } = require('../models/auth');
const { shopDetailsModel } = require('../models/shop-details')
const { v4 } = require('uuid');

function registrationController(req, res) {
    const { name, phone_number, email, password } = req.body;
    const unique_id = v4();
    const uid = unique_id.slice(0, 8)

    const userData = {
        primary_id: uid,
        owner_name: name,
        phone_number: phone_number,
        email: email,
        password: password

    }

    const shopDetailsData = {
        primary_id: uid,
        shop_name: "",
        shop_discription: "",
        shop_profile_picture: "",
        shop_cover_photo: ""
    }

    const registerNewUser = new authModel(userData)
    const shopDetails = new shopDetailsModel(shopDetailsData)

    authModel.findOne({
        'email': email
    })
        .then(user => {
            console.log('usert:', user)
            if (user === null || user.email !== email) {
                registerNewUser.save()
                    .then(newuser => {
                        shopDetails.save()
                            .then(() => {
                                console.log("shop-created")
                            })
                            .catch((e) => { 
                                res.status(400).json({ message: "cannot create shop!" })
                            })
                            res.status(200).json({ token: newuser["primary_id"] })
                    })
                    .catch(err => {
                        res.status(400).send('bad request can not create user!')
                        console.error({ message: `cannot craeta user! ${err.message}` })
                    })
            } else {
                console.error({ error: `shop already exist: ${err.message}` })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
}

async function signInController(req, res) {
    const { email, password } = req.body;
    const query = {
        'email': email,
        'password': password
    }
    try {
        authModel.findOne(query, (err, doc) => {
            if (err) {
                res.status(400).json({ message: 'bad request!' })
            }
            if (doc && (doc.email === email && doc.password === password)) {
                res.status(200).json({ token: doc["primary_id"] })
            } else {
                res.status(404).json({ message: "user not fonud!" })
            }
        })
    } catch (e) {
        res.status(400).json({ message: 'bad request!' })
    }
}

module.exports = { registrationController, signInController }


