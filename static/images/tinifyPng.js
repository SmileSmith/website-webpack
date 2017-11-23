const tinify = require('tinify');
const fs = require('fs');

const files = fs.readdirSync('./');
const imagefiles = files.filter(fileName => /\.[png$|jpe?g$]/.test(fileName));

imagefiles.forEach((fileName) => {
  tinify.key = 'HGKceeqF-vvB6GRc-kj0_h8S6i-dlZYm';
  const source = tinify.fromFile(fileName);
  source.toFile(fileName);
});
