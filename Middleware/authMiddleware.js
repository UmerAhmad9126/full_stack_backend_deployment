const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {

    const token = req.headers.authorization.split(" ")[1];

    if (token) {
        const decode = jwt.verify(token, "masai");
        console.log('decode:', decode);

        if (decode) {
            req.body.userID = decode.userID;
            console.log(req.body);
            next();
        }
        else {
            res.status(400).send("Login required")
        }
    }
    else {
        res.status(400).send("Login required")
    }

};


module.exports = {
    auth
};