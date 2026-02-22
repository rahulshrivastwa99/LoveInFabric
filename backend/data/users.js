const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'Admin User',
    email: 'admin@The Lyyn.com',
    password: bcrypt.hashSync('123456', 10), // Default password: 123456
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'user@The Lyyn.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
];

module.exports = users;