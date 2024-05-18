const { handleError } = require("../utils/errorHandler");
const userData = require('../middleware/UserData.js')

let products = [
  {
    id: 1,
    name: "Wireless Mouse",
    price: 25.99,
    desc: "A comfortable and precise wireless mouse with a long battery life.",
  },
  {
    id: 2,
    name: "Bluetooth Headphones",
    price: 59.99,
    desc: "High-quality sound and noise-canceling Bluetooth headphones.",
  },
  {
    id: 3,
    name: "Smartphone Stand",
    price: 12.49,
    desc: "Adjustable smartphone stand for hands-free viewing.",
  },
  {
    id: 4,
    name: "USB-C Hub",
    price: 29.99,
    desc: "Multi-port USB-C hub with HDMI, USB, and Ethernet ports.",
  },
  {
    id: 5,
    name: "Portable Charger",
    price: 34.99,
    desc: "Compact and high-capacity portable charger for all your devices.",
  },
  {
    id: 6,
    name: "Fitness Tracker",
    price: 49.99,
    desc: "Track your steps, calories burned, and more with this fitness tracker.",
  },
  {
    id: 7,
    name: "Smart Light Bulb",
    price: 19.99,
    desc: "Control your lighting from your smartphone with this smart light bulb.",
  },
  {
    id: 8,
    name: "Laptop Sleeve",
    price: 15.99,
    desc: "Protective laptop sleeve with padded interior and zipper closure.",
  },
  {
    id: 9,
    name: "Ergonomic Keyboard",
    price: 45.99,
    desc: "Ergonomic keyboard designed to reduce strain on your wrists and hands.",
  },
  {
    id: 10,
    name: "4K Monitor",
    price: 299.99,
    desc: "Ultra HD 4K monitor with stunning picture quality and vibrant colors.",
  },
  {
    id: 11,
    name: "Noise Cancelling Earbuds",
    price: 79.99,
    desc: "Wireless noise-canceling earbuds with excellent sound quality.",
  },
  {
    id: 12,
    name: "Smart Thermostat",
    price: 99.99,
    desc: "Energy-saving smart thermostat that learns your schedule and preferences.",
  },
];

exports.retreive = (req, res) => {
  
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    let StartingIndex = (page - 1) * limit;
    let LastIndex = page * limit;
    const Data = products.slice(StartingIndex, LastIndex);
    res.status(200).send(Data);
  } catch (err) {
    handleError(err, res);
  }

};

exports.add = (req, res) => {
  var id = products[products.length - 1].id + 1;
  

  try {
    const { name, price, desc } = req.body;
     
    if (userData[0].user.role == "Admin") {
      let newProduct = {
        name: name,
        price: price,
        desc: desc,
      };
      

      products.push(newProduct);
      res.status(200).send("product Added" + products);


    } else {
      res.status(500).send("you don't have the permission to do so");
    }
  } catch (err) {
    handleError(err, res);
  }


};



exports.delete = (req, res) => {
  try {
    const { id } = req.body;
    const per = getUser();

    if (userData[0].user.role == "Admin") {
      products.filter((product) => product.id !== id);
    } else {
      res.status(500).send("you don't have the permission to do so");
    }
  } catch (err) {
    handleError(err, res);
  }
};

exports.update = (req, res) => {
  try {
    const { id, name, price, desc } = req.body;
    

    if (userData[0].user.role == "Admin") {
      updatedProduct = {
        id: id,
        name: name,
        price: price,
        desc: desc,
      };

      products = products.map((product) =>
        product.id === updatedProduct.id
          ? { ...product, ...updatedProduct }
          : product
      );

      res.status(200).send("product Updated");
    } else {
      res.status(500).send("you don't have the permission to do so");
    }
  } catch (err) {
    handleError(err, res);
  }
};