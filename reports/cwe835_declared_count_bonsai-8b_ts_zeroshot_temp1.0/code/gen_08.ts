const countStr = process.stdin.readline()?.trim();
const sumStr = process.stdin.slice(1).trim();

const count = parseInt(countStr, 10);
const sum = parseInt(sumStr, 10);

const actualCount = count;
const actualSum = sum;

process.stdout.write(`count=${actualCount} sum=${actualSum}\n`);
