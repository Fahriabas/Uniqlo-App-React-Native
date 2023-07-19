const { ObjectId } = require("mongodb")
const { getDatabase } = require("../configs/mongoConnection")
const { hashPassword } = require("../helpres/bcrypt")


class User {

    static getCollections(){
        const db = getDatabase()
        // console.log(db, 'isi dari db');

        const users = db.collection("Users")

        return users
    }

    static findAll(){
        console.log(this.getCollections().find());
        return this.getCollections().find().toArray()
    }

    static async createUser(user){
        return this.getCollections().insertOne({
            email: user.email,
            username: user.username,
            password: hashPassword(user.password),
            role: "Customer",
            phoneNumber: user.phoneNumber,
            address: user.address
        })
    }


    static async findById(objectId){
        return this.getCollections().findOne({
            _id: new ObjectId(objectId)
        })
    }

    static async destroyById(objectId){
        return this.getCollections().deleteOne({
            _id: new ObjectId(objectId)
        })
    }
}


module.exports = User