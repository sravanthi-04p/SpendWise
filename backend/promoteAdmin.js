const db = require('./src/config/db');

const email = 'test@example.com';

const result = db
  .prepare(`UPDATE users SET role = 'admin' WHERE email = ?`)
  .run(email);

if (result.changes > 0) {
  console.log(`✅ ${email} is now an admin.`);
} else {
  console.log(`⚠️ No user found with email ${email}`);
}