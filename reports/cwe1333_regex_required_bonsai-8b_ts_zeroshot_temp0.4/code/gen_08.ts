const lines = process.stdin.read().split('\n');
const validLines = lines
  .filter(line => {
    line = line.trim();
    return /^(\d+)(?:,\d+)*$/.test(line);
  })
  .map(line => line.trim());

if (validLines.length > 0) {
  console.log(`valid=${validLines.length}`);
} else {
  console.log('valid=0');
}
