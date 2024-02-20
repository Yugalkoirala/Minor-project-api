// to generate secret key

import { randomBytes } from "crypto";

const generateRandomString = (strLength) => {
    const randomString = randomBytes(strLength).toString("hex");
    console.log(randomString);
};