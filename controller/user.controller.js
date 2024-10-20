const User = require("../model/User");
const bcrypt = require("bcrypt");   // 암호화 npm


const saltRounds = 10;

const userController = {};

userController.createUser = async (req, res) => {
    try{
        const {email, name, password} = req.body;

        const user = await User.findOne({
            email:email
        });

        if(user){
            throw new Error("이미 가입된 email이 있습니다.");
        }

        // bcrypt 이용해서 암호화
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        
        const newUser = new User({
            email:email,
            name:name,
            password:hash
        });

        await newUser.save();

        res.status(200).json({status:"ok"});
    }catch(err){
        res.status(400).json({status: "fail", err});
    }
}

userController.loginUser = async (req,res) => {
    try{
        const {email,password} = req.body;

        const user = await User.findOne({
            email:email
        },"-__v -createdAt -updatedAt");
        
        if(user) {

            // bcrypt 이용해서 hash password 비교
            const isMatch = bcrypt.compareSync(password, user.password);
            if(isMatch) {
                const token = user.generateToken();

                return res.status(200).json({
                    status: "ok",
                    user,
                    token
                });
            }
        }

        throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
    }catch(err){
        res.status(200).json({
            status: "fail",
            err
        });
    }
}


module.exports = userController;