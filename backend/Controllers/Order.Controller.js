const OrderModel = require("../models/OrderModel.js");

const createOrder = async (req, res) => {
  const today = new Date();
  let date = "";
  let deliverDate = "";
  const month = today.getMonth() + 1;
  if (month < 10) {
    date = today.getFullYear() + "-0" + month + "-" + today.getDate();
  } else {
    date = today.getFullYear() + "-" + month + "-" + today.getDate();
  }

  deliverDate = date;
  console.log(deliverDate);

  //find last order id
  await OrderModel.find()
    .sort({ _id: -1 })
    .limit(1)
    .then((data) => {
      let value = "";
      data.map((data) => {
        value = data.orderId;
      });

      let value2 = value.toString();
      let value3 = value2.substr(3, 7);
      let value4 = Number(value3) + 1;

      //order
      const orderData = new OrderModel({
        orderId: "ORD" + value4,
        customerID: req.body.userid,
        orderDate: deliverDate,
        request: "-",
        total: req.body.total,
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        postal: req.body.postal,
        phone: req.body.phone,
        itemPrice: req.body.itemPrice,
        itemname: req.body.itemname,
      });

      orderData
        .save()
        .then((data) => {
          console.log(Number(value3) + 1);
          res.status(200).send({ data: data });
        })
        .catch((error) => {
          res.status(500).send({ error: error.message });
        });
    });
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find();
    const sortedData = orders.sort((a, b) => b.createdAt - a.createdAt);
    res.send(sortedData);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const id = req.params.id;
    const orders = await OrderModel.find({ riders: id }).populate(
      "riders",
      "riderName"
    );
    const sortedData = orders.sort((a, b) => b.createdAt - a.createdAt);
    res.send(sortedData);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getOne = async (req, res) => {
  const id = req.params.id;
  OrderModel.findById({ _id: req.params.id })
    .populate("riders", "riderName")
    .then((data) => {
      res.status(200).send(data.riders);
      console.log(data);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
};

const updateOrder = async (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  await OrderModel.findByIdAndUpdate(id, req.body)
    .then((data) => {
      res.status(200).send("Updated");
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
};

const getCount = async (req, res) => {
  try {
    const count = await OrderModel.countDocuments({
      request: "-",
    });

    res.send(count.toString());
  } catch (error) {
    console.log(error);
  }
};

const getCount2 = async (req, res) => {
  try {
    const id = req.params.id;

    const count = await OrderModel.countDocuments({
      request: "pending",
      riders: id,
    });

    res.send(count.toString());
  } catch (error) {
    console.log(error);
  }
};

const payedOrders = async (req, res) => {
  try {
    console.log(req.body);
    const userId = req.body;

    await OrderModel.find({ customerID: req.body.customerID }).then((data) => {
      console.log(data);
      res.send(data);
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const viewOrders = async (req, res) => {
  try {
    const id = req.params.id;

    await OrderModel.find({ _id: id }).then((data) => {
      console.log(data);
      res.send(data);
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  updateOrder,
  getMyOrders,
  getOne,
  getCount,
  getCount2,
  payedOrders,
  viewOrders,
};
