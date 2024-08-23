const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,

        },
        email:{
            type: String,
            required: true,
            unique: true,
        },
        password:{
               type: String,
               required: true,
        }
    },
    {timestamps:true}
)

// Hash password before saving user
userSchema.pre('save', async function (next){
    if(this.isModified('password') || this.isNew){
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            next();
        }
        catch(error) {
            next(error);
        }

    }
    else{
        return next();
    }
})

// Compare hashed password

userSchema.methods.comparePassword = async function(userPassword) {
    return await bcrypt.compare(userPassword, this.password)
};

const User = mongoose.model('user', userSchema)

module.exports = User;