const mongoose = require("mongoose");
const schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchema = schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

// user Schema 중 원하는 데이터만 return
userSchema.methods.toJSON = function() {
    const obj = this._doc;
    delete obj.password;

    return obj;
};

userSchema.methods.generateToken = function() {
    const token = jwt.sign({ _id: this._id }, JWT_SECRET_KEY);
    return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;