const input = process.stdin.read();
const lines = input.trim().split('\n');

const validLines = lines.filter(line => {
  const strippedLine = line.trim();
  return /^(\d+)(,\d+)*$/.test(strippedLine);
});

const validCount = validLines.length;

console.log(`valid=${validCount}`);
