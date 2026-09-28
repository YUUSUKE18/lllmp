const lines = process.stdin.read().split('\n');
let validCount = 0;

for (const line of lines) {
  line = line.trim();
  if (line && /^\d+(?:,\d+)*$/.test(line)) {
    validCount++;
  }
}

console.log(`valid=${validCount}`);
