const { verivyToken } = require("../helpers/jwt");
const { User } = require("../models")


const authentication = async (req, res, next) => {

    console.log("masuk kedalam authentication")

    try {
        const {access_token} = req.headers;

        // console.log(access_token, 'isi access token didalam authentication');


        if(!access_token){
            throw {name: "unauthenticated"}
        }
    
        const payload = verivyToken(access_token)


        let user = {}
        user = await User.findOne({where : {id: payload.id}})

        console.log(user, 'isi dari user nih');
        
    
        if(!user){
            throw {name: "unauthenticated"}
        }

    
        req.additionalData = {
            userId: user.id,
            userName: user.userName,
            role: user.role
        }


        next()
    } catch (error) {
        console.log('masuk error disini nih')
        next(error)
    }

}

module.exports = authentication


