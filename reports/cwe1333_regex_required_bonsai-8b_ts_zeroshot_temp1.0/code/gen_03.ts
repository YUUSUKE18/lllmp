const lines = process.stdin.read().split('\n');
const validLines = lines
  .filter(line => {
    const trimmed = line.trim();
    return /^\d+(?:,\d+)*$/.test(trimmed);
  })
  .filter(line => line.trim() !== '');

const count = validLines.length;
console.log(`valid=${count}`);
