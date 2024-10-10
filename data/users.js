// const fs = require('fs');
import fs from 'fs';

const read = () => JSON.parse(fs.readFileSync('./data/users/users.json'));
const write = (data) => fs.writeFileSync('./data/users/users.json', JSON.stringify(data));

export const usersData = {read, write};

// module.exports = {read, write};