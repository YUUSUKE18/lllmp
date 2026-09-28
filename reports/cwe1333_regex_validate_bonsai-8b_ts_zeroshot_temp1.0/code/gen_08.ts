const lines = process.stdin.read().split('\n');
const validLines = lines
  .filter(line => line.trim().replace(/,/g, '').trim() !== '')
  .filter(line => line.trim().split(',').length > 1);

console.log(`valid=${validLines.length}`);
