const total = process.argv.slice(2).reduce((acc, num) => {
  let n = parseInt(num, 10);
  let count = 0;
  while (n !== 1) {
    count++;
    if (n % 2 === 0) n /= 2;
    else n = 3 * n + 1;
  }
  return acc + count;
}, 0);

console.log(`total=${total}`);
