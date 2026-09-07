const fs = require('fs');

const data = fs.readFileSync(process.stdin.fd, 'utf8').split('\n').filter(Boolean);

let pairs = 0;

for (let i = 0; i < data.length - 1; i++) {
  for (let j = i + 1; j < data.length; j++) {
    if (parseInt(data[i]) + parseInt(data[j]) === parseInt(data[data.length - 1])) {
      pairs++;
    }
  }
}

console.log(`pairs=${pairs}`);
