const stdin = process.stdin;

const validLine = /^[1-9]\d*(?:,\d+)*$/;

const lines = stdin.readAllLines();
const validLines = lines.filter(line => line.trim() && validLine.test(line.trim()));

console.log(`valid=${validLines.length}`);
