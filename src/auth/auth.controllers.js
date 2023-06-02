const authServices = require("./auth.services");
const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../../config");

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const data = await authServices.checkUserCredentials(email, password);

        if (!data)
            return res.status(401).json({ message: "Incorrects credentials" });

        const token = jwt.sign(
            {
                sub: data.id,
                role: data.role,
            },
            jwtSecret
        );
        return res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({
            messge: "Bad request",
            error,
        });
    }
}

module.exports = {
    loginUser,
};
