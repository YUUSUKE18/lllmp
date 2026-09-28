const line = process.stdin.readline();
const regex = /^[\d,]+$/;
const validLines = line.trim().split(/,\s*/).filter(Boolean).map(line => line.trim());

const validCount = validLines.length;

if (validCount > 0) {
  process.stdout.write(`valid=${validCount}\n`);
} else {
  process.stdout.write('');
}
