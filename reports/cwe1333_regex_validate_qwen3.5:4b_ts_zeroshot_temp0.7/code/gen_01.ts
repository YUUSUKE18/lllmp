const input = process.stdin.read();
const lines = input.split('\n');
let validCount = 0;

for (const line of lines) {
  if (line.trim() === '') continue;
  
  const trimmed = line.trim();
  if (!trimmed.match(/^[0-9,\d]+$/)) {
    continue;
  }
  
  const parts = trimmed.split(',').map(s => parseInt(s, 10));
  if (parts.length >= 1) {
    validCount++;
  }
}

console.log(`valid=${validCount}`);
