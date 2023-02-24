const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ft_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// mongoose.set('strictPopulate', false)

module.exports = mongoose.connection;