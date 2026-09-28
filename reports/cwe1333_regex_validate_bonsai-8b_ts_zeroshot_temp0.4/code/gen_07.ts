const lines = process.stdin.read().split('\n');
const validLines = lines
  .filter(line => line.trim() && /^\d+(?:,\d+)*$/.test(line))
  .map(line => line.trim());

console.log(`valid=${validLines.length}`);
