const User = require("../models/user");

class Controller {
  static async findAllUser(req, res, next) {

    try {
      const allUser = await User.findAll();
      console.log(allUser,'masuk kedalam findAll users ini isi dari allUser line 8');

      res.status(200).json({
        statusCode: 200,
        data: allUser,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async registerUser(req, res, next) {
    try {
      const { email, username, password, phoneNumber, address } = req.body;

    //   console.log(email, username, "isi dari email dan username");

    console.log(req.body, 'isi dari req.body nih<<<');
      const newUser = await User.createUser({
        email: email,
        username: username,
        password: password,
        phoneNumber: phoneNumber,
        address: address,
      });
      console.log(newUser, 'isi dari newUser');

      res.status(201).json({
        statusCode: 201,
        message: "success create register",
        id: newUser.insertedId,
        email: email,
        role: "Customer",
        username: username,
        password: password,
        phoneNumber: phoneNumber,
        address: address,
      });


    } catch (error) {
      console.log(error);
    }
  }

  static async deleteById(req, res, next) {
    try {
      const { id } = req.params;

      const user = await User.findById(id);

      const deletedUser = await User.destroyById(id);

    //   console.log(deletedUser, "isi dari deletedUser nih<<<<<<<<<<");

      res.status(200).json({
        statusCode: 200,
        message: "success delete users by id",
      });

      // console.log(user, 'isi dari user nih <<<<<<');
    } catch (error) {
        console.log(error);
    }
  }

  static async findOneUser(req, res, next){
    try {

      const { id } = req.params
      if(!id){
        throw { name: "Data Not Found"}
      }

      const user = await User.findById(id)

      console.log(user, 'line 77');

      res.status(200).json({
        statusCode: 200,
        user
      })

      console.log('masuk kedalam findOne users nih');
    } catch (error) {
      console.log(error);
      res.status(404).json({
        statusCode: 404,
        message: "data not found"
      })
    }
  }
}

module.exports = Controller;
