const lines = process.stdin.read().split('\n');
const validLines = lines
  .filter(line => {
    line = line.trim();
    if (!line) return false;
    const parts = line.split(',');
    return parts.length >= 2;
  })
  .map(line => line.trim());

const validCount = validLines.length;

process.stdout.write(`valid=${validCount}\n`);
