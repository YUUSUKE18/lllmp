const lines = process.stdin.read().split('\n');
const validLines = lines
  .filter(line => {
    line = line.trim();
    if (!line) return false;
    const regex = /^(\d+)(?:,\d+)*$/;
    return regex.test(line);
  })
  .map(line => line.trim());

const validCount = validLines.length;

console.log(`valid=${validCount}`);
