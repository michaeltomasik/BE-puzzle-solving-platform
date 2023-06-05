import { Sequelize } from 'sequelize';

// Initialize Sequelize
const sequelize = new Sequelize('sqlite::memory:');

export default sequelize;
