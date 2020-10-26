const mongoose = require('mongoose');
module.exports = connectString => {
  mongoose
    .connect(connectString, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(() => {
      const arr = ['disconnected', 'connected', 'connecting', 'disconnecting'];
      console.log(`Database status - ${arr[mongoose.connection.readyState]}`);
    });
};
