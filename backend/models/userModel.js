const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true},
        password: { type: String, required: true },
        pic: { type: String, default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" },
    },
    {
        timestamps: true,
    }
)

userSchema.pre("save", async function (next){
    if(!this.modified){
        next()
    }
});

const User = mongoose.model("User", userSchema)

module.exports = User;