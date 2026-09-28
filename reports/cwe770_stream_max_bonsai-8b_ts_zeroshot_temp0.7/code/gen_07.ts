const input = process.stdin.read();
const elements = input
  .split(',')
  .map(e => e.trim())
  .filter(e => !e.length)
  .map(e => {
    const num = parseInt(e, 10);
    if (isNaN(num)) return;
    const is64bit = num > 2147483647 || num < -2147483648;
    if (!is64bit) return;
    return { count: 1, max: num };
  })
  .reduce((acc, curr) => {
    acc.count += curr.count;
    acc.max = Math.max(acc.max, curr.max);
    return acc;
  }, { count: 0, max: 0 });

console.log(`count=${elements.length} max=${elements[0]}`);
