const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Baglandi (Connected)...');
  } catch (err) {
    console.error('Veritabani baglanti hatasi:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;