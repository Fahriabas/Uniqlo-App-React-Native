

const errorHandler = (err, req, res, next) => {
    console.log('masuk error handler');

    switch (err.name) {
        case "LoginErr":
            res.status(400).json({
                statusCode: 400,
                message: "Invalid Email Or Password"
            })
            break;
    
        default:
            res.status(401).json({
                message: "Internal Server Error"
            })
            break;
    }
}


module.exports = errorHandler