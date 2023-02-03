const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

//setting up the user model to only have username and password
const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    results: [
        {
            type: Schema.Types.ObjectId,
            ref: "Results"
        }
    ],
    video: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ]
});

//if its new or we update password, we will be encrypting the password so we can store the password without worry of stealing data
UserSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds)
    }
    next();
});
//lets check if its the correct password
UserSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password.this.password)
};

const User = model('User', UserSchema);

module.exports = User;