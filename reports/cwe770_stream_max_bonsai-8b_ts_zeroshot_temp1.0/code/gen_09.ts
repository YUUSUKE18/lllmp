const input = process.stdin.read().trim();
const elements = input
  .split(',')
  .map(element => element.trim())
  .filter(element => !element === '' && /^-?\d+$/.test(element));

const count = elements.length;
const max = elements.reduce((a, b) => {
  const numA = parseInt(a);
  const numB = parseInt(b);
  return numA > numB ? numA : numB;
}, -Infinity);

console.log(`count=${count} max=${max}`);
