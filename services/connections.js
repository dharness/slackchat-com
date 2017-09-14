const mongoose = require('mongoose');


mongoose.Promise = global.Promise;

const connect = async () => {
  mongoose.set('debug', process.env.NODE_ENV !== 'production');
  return mongoose.connect(process.env.MONGO_URL);
}

module.exports = { connect };
