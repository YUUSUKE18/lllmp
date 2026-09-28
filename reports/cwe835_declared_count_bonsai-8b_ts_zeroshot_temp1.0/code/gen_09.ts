const input = process.stdin.read().split('\n');
let count = 0;
let sum = 0;

for (const line of input) {
  if (line.trim() === '') continue;
  const parts = line.split(/\s+/);
  if (parts.length < 2) continue;
  const numStr = parts[1];
  const num = parseInt(numStr, 10);
  if (!isNaN(num)) {
    count++;
    sum += num;
  }
}

console.log(`count=${count} sum=${sum}`);
