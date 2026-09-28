const line1 = process.stdin.readline();
const line2 = process.stdin.readline();

const count = 0;
const sum = 0;

if (line1) {
  const numStr = line1.trim();
  if (!numStr.match(/^-?\d+$/)) return;
  count = parseInt(numStr, 10);
  sum = numStr ? parseInt(numStr, 10) : 0;
}

if (line2) {
  const numStr = line2.trim();
  if (!numStr.match(/^-?\d+$/)) return;
  sum += parseInt(numStr, 10);
  count++;
}

const actualCount = count;
const actualSum = sum;

console.log(`count=${actualCount} sum=${actualSum}`);
