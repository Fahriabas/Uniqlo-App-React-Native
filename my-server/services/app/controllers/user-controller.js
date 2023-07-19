const { checkPassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { Category, Product, User, Image, sequelize } = require("../models");

class UserController {
  static async login(req, res, next) {
    try {
      console.log(req.body, "didalam static login user");
      console.log("masuk kedalam login nih<<<<<");
      const { email, password } = req.body;

      const user = await User.findOne({
        where: {
          email: email,
        },
      });

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

      console.log(user, "isi dari user nih<<<<");
    } catch (error) {
      console.log(error);
    }
  }

  static async productList(req, res, next) {
    try {
      console.log("masuk kedalam");

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
      //untuk product findAll tidak ada image yang diinclude, includenya pas detail
      // console.log(product, 'isi dari produc t nih');

      res.status(200).json({
        statusCode: 200,
        data: product
      })

    } catch (error) {
        console.log(error);
    }
  }

  static async detail(req, res, next){
    try {
        console.log('masuk kedetail');
        console.log(req.params, 'isi dari req.params');
        const { id } = req.params

        // const productDetail = await Product.findOne({
        //     where: {
        //         id: id
        //     }
        // })

        
        
        const productDetail = await Product.findOne({
          where: {
            id: id
          },
          include: [
            {
              model: Category,
              attributes: ['name'],
              raw: true
            }
          ],
          raw: true
        });
        
        
        // console.log(productDetail, 'isi dari product detail nih');
        const imageDetail = await Image.findAll({
            where: {
                productId: productDetail.id
            }
        })

        console.log(imageDetail, 'isi dari imageDetail nih');
        res.status(200).json({
            statusCode: 200,
            data: productDetail,
            imageOptional : imageDetail 
        })

        // console.log(productDetail, 'isi dari productDetail');

        // console.log(imageDetail, 'isi dari image');

    } catch (error) {
        console.log(error);
    }
  }
}

module.exports = UserController;
