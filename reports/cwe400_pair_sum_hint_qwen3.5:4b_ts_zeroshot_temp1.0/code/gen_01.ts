const target = Number(readLine());
if (isNaN(target)) process.exit(0);

let count = 0;
const n = readLines().length;

for (let i = 0; i < n && count === 0; i++) {
  let a = BigInt(readLine());
  if (!isNumber(a)) continue;
  for (let j = i + 1; j < n; j++) {
    b = parseInt(readLines(j));
    if (!isNumber(b)) continue;
    // ...
    if (a + b === target) count++;
  }
}

process.exit(count);
