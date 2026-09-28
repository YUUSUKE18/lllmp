const lines = process.stdin.read().split('\n');
let validCount = 0;

for (const line of lines) {
  const trimmedLine = line.trim();
  if (!trimmedLine) continue;
  
  const parts = trimmedLine.split(',');
  if (parts.length >= 2) validCount++;
}

console.log(`valid=${validCount}`);
