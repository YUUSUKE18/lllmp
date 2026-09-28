const input = process.stdin.read();
const lines = input.trim().split('\n').filter(line => !line.trim());

let target = parseInt(lines[0]);
let pairs = 0;

if (lines.length <= 1) {
  process.exit(0);
}

for (let i = 1; i < lines.length; i++) {
  const value = parseInt(lines[i]);
  if (!isNaN(value) && value >= 0 && value <= 2**63 - 1) {
    if (value >= 0 && value <= target) {
      if (target - value >= 0 && target - value <= 2**63 - 1) {
        pairs += 1;
      }
    }
  }
}

console.log(`pairs=${pairs}`);
