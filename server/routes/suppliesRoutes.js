const mongoose = require('mongoose');
const Supply = mongoose.model('supplies');

module.exports = app => {
    app.get('/api/supplies', async(req, res) => {
        const supplies = await Supply.find();

        res.send(supplies);
    });

    app.post('/api/supplies', async(req, res) => {
        const { _id, stock } = req.body;

        const supply = Supply.findOneAndUpdate(
            {
                _id
            },
            {
                $inc: { stock: -stock  },
                $set: { _buyer: mongoose.Types.ObjectId('5a92f0d9e1d99b04d6089442') },
                dateBought: new Date()
            }
        ).exec((err, doc) => {
            if (err) res.status(422).send(err);
        });

        try {
            await supply.save();
        } catch (err) {
            res.status(422).send(err);
        }
    });
};