import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// XAMPP me MySQL default username, password aur database ka use karein
const sequelize = new Sequelize('ecommerce-app', 'root', '', {
  host: 'localhost',       // XAMPP me by default localhost pe hota hai
  dialect: 'mysql',        // MySQL dialect
  logging: false,          // SQL queries ko log karne se rokta hai
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Database connected');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  }
};

export default sequelize;
