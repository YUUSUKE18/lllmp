const stdin = process.stdin;

const validLine = /^[1-9][0-9,]*$/;

const lines = stdin
  .readAllLines()
  .filter(line => line.trim() && validLine.test(line.trim()))
  .map(line => line.trim());

const validCount = lines.length;

console.log(`valid=${validCount}`);
