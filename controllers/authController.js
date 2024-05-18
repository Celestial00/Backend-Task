const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { handleError } = require("../utils/errorHandler");
const userData = require('../middleware/UserData.js')


let users = []; // In-memory storage for users

exports.register = async (req, res) => {
  const { username, password, Role } = req.body;

  try {
    let user = users.find((user) => user.username === username);

    if (user) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = {
      username,
      password: hashedPassword,
      Role,
    };





    users.push(user);


    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    handleError(err, res);
  }
};

exports.login = async (req, res) => {

  const { username, password } = req.body;

  try {
    const user = users.find((user) => user.username === username);


    if (!user) {
      return res.status(400).json({ message: "Invalid Name" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const payload = {
      user: {
        username: user.username,
        role: user.Role,
      },
    };


    userData.push(payload)

    

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });

  } catch (err) {

    handleError(err, res);

  }

};

exports.logout = (req, res) => {
  res.status(200).json({ message: "User logged out successfully" });
};
