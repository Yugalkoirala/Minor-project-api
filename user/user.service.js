import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./user.model.js";
import { loginUserValidationSchema, registerUserValidationSchema } from "./user.validation.js";

// *register user

export const registerUser = async (req, res) => {
    // extract from req.body
    const newUser = req.body;

    // validation
    try {
        await registerUserValidationSchema.validateAsync(newUser);
    } catch (error) {
        // if validation fails, terminate
        return res
            .status(400)
            .send({ message: error.message });
    }

    // check if the email is already used
    const user = await User.findOne({ email: newUser.email });

    if (user) {
        // if already used, terminate
        return res
            .status(409)
            .send({ message: "User with this email already exists..." });
    }

    // hash password using bcrypt.hash()
    const hashedPassword = await bcrypt.hash(newUser.password, 10);

    // replace req.body.password/newuser.password with hashed password
    newUser.password = hashedPassword;

    // create user on db
    await User.create(newUser);

    return res
        .status(201)
        .send("User is registered successfully");
}

// *login user

export const loginUser = async (req, res) => {

    // extract login credentials from req.body
    const loginCredentials = req.body;

    // validate login credentials


    try {
        await loginUserValidationSchema.validateAsync(loginCredentials);
    } catch (error) {
        // if validation fails, terminate
        return res.status(400).send({ message: error.message });
    }

    // check if user with provided email exists
    const user = await User.findOne({ email: loginCredentials.email });

    // is not user, terminate
    if (!user) {
        return res.status(404).send({ message: "Invalid Credentials" });
    }

    // check for password match using bcrypt.compare()
    const passwordMatch = await bcrypt.compare(
        loginCredentials.password, //plain password
        user.password //hased password
    );

    // if now password match, terminate
    if (!passwordMatch) {
        return res.status(404).send({ message: "Invalid Credentials" });
    }

    // encrypt user information as a token using jsonwebtoken, jwt.sign(token,secret_key)
    const token = jwt.sign(
        { email: user.email },
        process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
        {
            expiresIn: process.env.JWT_SECRET_TOKEN_EXPIRY,
        }
    );

    // hide user password
    user.password = undefined;

    // return user and token as response
    return res.status(200).send({ user, token });
}