const input = process.stdin.read().trim();
const elements = input.split(',').filter(element => {
  const stripped = element.trim();
  if (!stripped) return false;
  const num = parseInt(stripped, 10);
  return !isNaN(num) && num >= -9223372036854775808 && num <= 9223372036854775807;
});

const count = elements.length;
const max = elements.reduce((a, b) => {
  const numA = parseInt(a.trim(), 10);
  const numB = parseInt(b.trim(), 10);
  return numA > numB ? numA : numB;
}, -9223372036854775808);

console.log(`count=${count} max=${max}`);
