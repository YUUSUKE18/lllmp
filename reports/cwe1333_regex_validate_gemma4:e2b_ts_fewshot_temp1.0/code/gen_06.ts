const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines = 0;

rl.on('line', (line) => {
  lines++;
});

rl.on('close', () => {
  // 読み終わった後、行数を出力する
  console.log(`valid=${lines}`);
});
