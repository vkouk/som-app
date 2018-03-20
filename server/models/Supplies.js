const mongoose = require('mongoose');
const { Schema } = mongoose;

const supplySchema = new Schema({
    title: {
        type: String
    },
    stock: {
        type: Number,
        default: 0
    },
    _buyer : {
        type: Schema.Types.ObjectId, ref: 'Users'
    },
    dateBought: Date
});

const SupplyModel = mongoose.model('supplies', supplySchema);
module.expports = SupplyModel;