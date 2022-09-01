const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({

        orderId: {
            type: String,
            required: true
        },
        customerID: {
            type: String,
            required: true
        },
        orderDate: {
            type: String,
            required: true
        },
        request: {
            type: String,
            required: true
        },
        riders: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'riders'
        },
        total: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: false
        },
        postal: {
            type: String,
            required: false
        },
        phone: {
            type: String,
            required: true
        },
        itemPrice: [
            {
                type: String,
                required: true
            }
        ],
        itemname: [
            {
                type: String,
                required: true
            }
        ]

    },

    {
        timestamps: true
    })

const OrderModel = mongoose.model('orders', orderSchema);
module.exports = OrderModel;