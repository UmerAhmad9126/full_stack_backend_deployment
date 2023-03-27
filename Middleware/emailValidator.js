const { UserModel } = require("../Models/UserModel");

const emailValidator = async (req, res, next) => {

    const { email } = req.body;

    try {

        const user = await UserModel.find();
        // console.log('user:', user);
        let flag = true
        user.map((el) => {
            if (el.email === email) {
                res.send("Email already Exists");
                flag = false;
            }
        });

        if (flag === true) {
            next();
        }

    } catch (error) {
        res.status(400).send(error.message);
    }


}


module.exports = {
    emailValidator
}