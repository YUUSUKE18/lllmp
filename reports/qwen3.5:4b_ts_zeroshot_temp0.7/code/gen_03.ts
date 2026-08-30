const input = process.stdin.read();
if (!input) {
  console.log('count=0 sum=0\n');
  process.exit(0);
}

const parts = input.trim().split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
const uniqueNumbers = new Set(parts);

let count = 0;
let sum = 0n;

for (const num of uniqueNumbers) {
  if (num !== null && Number.isInteger(num)) {
    count++;
    sum += BigInt(num);
  }
}

console.log(`count=${count} sum=${sum}\n`);
