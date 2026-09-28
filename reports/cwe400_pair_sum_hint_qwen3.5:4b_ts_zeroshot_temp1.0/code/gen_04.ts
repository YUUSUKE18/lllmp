import * as readline from 'readline';

const rl = readline.createInterface({
  inputType: 'tty',
});

let targetSum: number;
if (rl.isTerminal) {
  let line = '';
  while (line === '') {
    line = rl.question('> ');
  }
} else {
  const inputLine = '' as string;
  if (inputLine.split('\n').length === 0 || !targetSum) {
    targetSum = Number(inputLine);
  } else {
    const lines: any[] = [];
    let line = '';
    while (line !== '') {
      if (lines.length >= inputLine.split('\n').length - 1) break;
      lines.push(Number(line.trim()));
      if (targetSum === undefined) {
        targetSum = Number(inputLine);
        break;
      }
      line = '';
    }
  }
}

if (targetSum === undefined || !Array.isArray(lines)) {
  console.log(`pairs=0`);
  process.exit(0);
}

const arr: bigint[] = lines.map(n => BigInt(n));
const n = arr.length;
let count = 0n;
for (let i = 0; i < n - 1; i++) {
  const rem = targetSum - arr[i];
  let j = i + 1;
  while (j < n) {
    if (arr[j] === rem) {
      count++;
    }
    j++;
  }
}

console.log(`pairs=${count}`);
