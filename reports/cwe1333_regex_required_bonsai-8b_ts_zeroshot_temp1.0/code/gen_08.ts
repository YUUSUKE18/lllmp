const input = process.stdin.read();
const lines = input.trim().split('\n');

const validLines = lines.filter(line => {
  const trimmed = line.trim();
  if (!trimmed) return false;
  return /^(\d+)(?:,\d+)*$/.test(trimmed);
});

const validCount = validLines.length;

console.log(`valid=${validCount}`);
