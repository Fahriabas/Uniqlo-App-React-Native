const axios = require("axios");
const redis = require("../config/redis");

const BASE_URL_USER = "http://localhost:4001";
const BASE_URL_APP = "http://localhost:4002";
class Controller {
  static async findAllProduct(req, res, next) {
    try {
      let productCache = await redis.get("product:get");

    //   console.log(productCache, "isi dari product cache");

      if (productCache) {
        let productResult = JSON.parse(productCache);
        return res.status(200).json(productResult);
      }

    //   console.log("masuk kedalam findAll products");
      const { data } = await axios.get(`${BASE_URL_APP}/pub/products`);
    //   console.log(data, "isi dari data nih");
      res.status(200).json({
        statusCode: 200,
        data: data.data,
      });

      redis.set("product:get", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  }

  static async findOneProduct(req, res, next) {

    try {
        const { id } = req.params;

        // Cek apakah data sudah ada dalam cache Redis
        let productCache = await redis.get(`product:${id}`);
    
        if (productCache) {
          let productResult = JSON.parse(productCache);
          return res.status(200).json({
            statusCode: 200,
            data: productResult,
          });
        }
    
        // Jika data belum ada dalam cache Redis, lakukan permintaan ke endpoint
        const { data } = await axios.get(`${BASE_URL_APP}/pub/detail/${id}`);
        console.log(data, 'isi dari data keluaran backend');
        res.status(200).json({
          statusCode: 200,
          data: data.data,
          imageOptional: data.imageOptional
        });
    
        // Simpan data ke cache Redis
        redis.set(`product:${id}`, JSON.stringify(data.data));
    
    } catch (error) {
      console.log(error);
    }
  }

  static async createProduct(req, res, next) {
    try {

      const data = await axios.post(`${BASE_URL_APP}/product`, req.body);

      await redis.del("product:get");

      res.status(201).json({
        statusCode: 201,
        message: "Successfully create new product",
      });
      console.log(data, "isi dari data");
    } catch (error) {
      console.log(error);
    }
  }

  static async updateProduct(req, res, next) {
    try {

      const { id } = req.params;

      const { data } = await axios.put(
        `${BASE_URL_APP}/product/${id}`,
        req.body
      );
      // console.log(data, "isi dari data nih");

      await redis.del("product:get")

      res.status(200).json({
        statusCode: 200,
        message: "success to update product",
      });

    } catch (error) {
      console.log(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {

      const { id } = req.params;
      const { data } = await axios.delete(`${BASE_URL_APP}/product/${id}`);

      await redis.del("product:get")
      res.status(200).json({
        statusCode: 200,
        message: "success do delete",
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async register(req, res, next) {
    try {
      // console.log("masuk ke register nih");
      const {data} = await axios.post(`${BASE_URL_USER}/register`, req.body);

      res.status(201).json(data)
    } catch (error) {
      res.status(404).json({
        statusCode: 400,
        message: error,
      });
    }
  }

  static async findAllUser(req, res, next){
    // console.log('masuk kedalam findAll users');
    try {

      let userCache = await redis.get("users:get");

      if (userCache) {
        let userResult = JSON.parse(userCache);
        console.log(userResult, 'line 141');
        return res.status(200).json(userResult);
      }

      const {data} = await axios.get(`${BASE_URL_USER}/users`)
      console.log(data, 'line 145');
      res.status(200).json(data)
      redis.set("users:get", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  }

  static async findOneUser(req, res, next){
    try {

      console.log('masuk kedalam findOneUser');
      console.log(req.params, 'isi dari req.params');
      const { _id } = req.params
      let detailUserCache = await redis.get(`users:${_id}`)

      if(detailUserCache){
        const userResult = JSON.parse(detailUserCache)
        return res.status(200).json(userResult)
      }


      const { data } = await axios.get(`${BASE_URL_USER}/users/${_id}`)
      res.status(200).json(data)

      redis.set(`users:${_id}`, JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteUserById(req, res, next){
    try {
      console.log('masuk kedelete user by id');
      const { _id } = req.params
      const { data } = await axios.delete(`${BASE_URL_USER}/users/${_id}`)

      console.log(data, 'hasil dari axios nih');

      await redis.del("users:get");
      await redis.del(`users:${_id}`)
      res.status(200).json(data)

    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;
