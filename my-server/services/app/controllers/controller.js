const { checkPassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { Category, Product, User, Image, sequelize } = require("../models");

class Controller {
  static async home(req, res, next) {
    try {
      res.status(200).json({
        statusCode: 200,
        message: "aman nih",
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async dashboard(req, res, next) {
    try {
      console.log("masuk kedalam controller dashboard");
      const product = await Product.findAll();
      const category = await Category.findAll();

      const totalProduct = product.length;
      const totalCategory = category.length;

      res.status(200).json({
        statusCode: 200,
        totalProduct,
        totalCategory,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async productList(req, res, next) {
    try {
      const product = await Product.findAll({
        include: [
          {
            model: Category,
            attributes: ["name"],
            raw: true,
          },
        ],
        raw: true,
      });
      console.log(product, "isi dari product nih");
      res.status(200).json({
        statusCode: 200,
        message: "mantap",
        data: product,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async categoryList(req, res, next) {
    try {
      const category = await Category.findAll();
      res.status(200).json({
        statusCode: 200,
        data: category,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async addProduct(req, res, next) {
    const trx = await sequelize.transaction();
    try {


      const { name, categoryId, mainImg, description, price, imageUrls } =
        req.body;
      
      console.log(req.body, 'isi dari req.body');

      const newProduct = await Product.create(
        {
          name: name,
          authorId: 1,
          categoryId: categoryId,
          mainImg: mainImg,
          price: price,
          description: description,
        },
        {
          trx,
        }
      );

      if (imageUrls && imageUrls.length > 0) {
        const images = [];

        for (let i = 0; i < imageUrls.length; i++) {
          const newImage = await Image.create(
            {
              imgUrl: imageUrls[i],
              productId: newProduct.id,
            },
            {
              trx,
            }
          );
          images.push(newImage);
        }
        newProduct.images = images;
      }

      await trx.commit()

      res.status(201).json({
          statusCode: 201,
          message: "success create new product",
          data: newProduct
      })

    } catch (error) {
        await trx.rollback(); // Rollback transaction jika terjadi kegagalan
      console.log(error);
    }
  }

  static async createCategory(req, res, next) {
    try {
      const { name } = req.body;
      const newCategory = await Category.create({
        name: name,
      });

      res.status(201).json({
        statusCode: 201,
        data: newCategory,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;

      const deletedProduct = await Product.destroy({
        where: {
          id: id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "success delete",
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async adminRegister(req, res, next) {
    try {
      const { email, userName, password, Address, phoneNumber } = req.body;

      const newAdmin = await User.create({
        email: email,
        userName: userName,
        password: password,
        Address: Address,
        phoneNumber: phoneNumber,
        role: "Admin",
      });

      res.status(200).json({
        statusCode: 200,
        message: "success create register",
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;
      const deletedCategory = await Category.findOne({
        where: {
          id: id,
        },
      });

      const destroyCategory = await Category.destroy({
        where: {
          id: id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "success delete category",
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async detailProduct(req, res, next) {
    try {
      console.log("masuk kedalam detail product");
      console.log(req.params, "isi dari req.params");
      const { idProduct } = req.params;

      const detail = await Product.findOne({
        where: {
          id: idProduct,
        },
      });

      // const imageDetail = await Image

      console.log(detail, "isi dari detail nih");

      res.status(200).json({
        statusCode: 200,
        data: detail,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async login(req, res, next) {
    try {
      console.log("masuk ketempat login");
      // console.log(req.body);
      console.log(req.body, "isi dari req.body nih<<<");

      const { email, password } = req.body;

      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      console.log(user, "isi dari user nih");

      if (!user) {
        throw { name: "Invalid Login" };
      }

      if (!checkPassword(password, user.password)) {
        throw { name: "Invalid Login" };
      }

      const access_token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      res.status(200).json({
        statusCode: 200,
        access_token,
        userName: user.userName,
        role: user.role,
        id: user.id,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async editProduct(req, res, next) {
    try {
      // console.log("masuk kedalam edit product nih <<<<<");
      // console.log(req.body, "isi req.body nih");
      // console.log(req.params, "isi req.params nih<<<");

      const { id } = req.params;
      const { name, description, categoryId, mainImg, price } = req.body;

      const updatedProduct = await Product.update(
        {
          name: name,
          description: description,
          categoryId: categoryId,
          mainImg: mainImg,
          price: price,
        },
        {
          where: { id: id },
        }
      );

      res.status(201).json({
        statusCode: 200,
        message: "success do update",
        data: updatedProduct,
      });
      
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;
