const lines = process.stdin.read().split('\n');
const validLines = lines.filter(line => {
  const trimmedLine = line.trim();
  return /^\d+(?:,\d+)*$/.test(trimmedLine);
});

const validCount = validLines.length;
console.log(`valid=${validCount}`);
