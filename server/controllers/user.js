import User from "../models/user.js";

export const registerUser = async (req, res) => {
  try {
    const { username, firstName, lastName } = req.body;
    const newUser = new User({
      firstName,
      lastName,
      username,
    });

    console.log(newUser);
    const d = await newUser.save();

    res.status(201).json(d);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username: username });
    if (!user) {
      res.status(400).json("user is not registered");
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
