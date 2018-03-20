const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const Supply = mongoose.model('supplies');

module.exports = app => {
    app.get('/api/supplies', requireLogin, async(req, res) => {
        const supplies = await Supply.find();

        res.send(supplies);
    });

    app.post('/api/supplies', requireLogin, async(req, res) => {
        const { _id, stock } = req.body;
        const supply = Supply.findOneAndUpdate({ _id }, { $inc: { stock: -1 } }, { $set: {  _buyer: req.user._id, dateBought: Date.now() } },
            function(err, doc) {
                if (err) {
                    res.status(422).send(err);
                }
        });

        try {
            await supply.save();
        } catch (err) {
            res.status(422).send(err);
        }
    });
};