const input = process.stdin.read();
const parts = input.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
const unique = new Set(parts);
let sum = 0;
for (const n of unique) {
  sum += n;
}
console.log(`count=${unique.size} sum=${sum}`);
