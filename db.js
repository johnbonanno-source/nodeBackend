const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    await mongoose.connect('mongodb+srv://Budgethero:eatbutt@cluster0.55ykuqg.mongodb.net/Users?retryWrites=true&w=majority', {
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
    });
    console.log('Database connection established');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};

module.exports = connectDatabase;
