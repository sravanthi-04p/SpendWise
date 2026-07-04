require('dotenv').config();
const app = require('./app');
require('./config/db');
const seedDemoData = require('./config/seed');

const PORT = process.env.PORT || 5000;

seedDemoData().then(() => {
  app.listen(PORT, () => {
    console.log(`Spend Wise API running on port ${PORT}`);
  });
});