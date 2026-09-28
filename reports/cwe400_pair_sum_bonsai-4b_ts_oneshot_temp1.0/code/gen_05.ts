const input = process.stdin.read().toString('utf8');
const lines = input.split('\n');
let pairs = 0;

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (line === '') continue;
  const n = parseInt(line, 10);
  if (isNaN(n)) continue;

  if (n >= 0 && n <= 9096399025) {
    for (let j = i + 1; j < lines.length; j++) {
      const line2 = lines[j].trim();
      if (line2 === '') continue;
      const n2 = parseInt(line2, 10);
      if (isNaN(n2)) continue;

      if (n + n2 === 9096399025) {
        pairs++;
      }
    }
  }
}

console.log(`pairs=${pairs}`);
