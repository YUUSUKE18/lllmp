const input = process.stdin.read() || '';
const lines = input.split('\n');

// Filter out empty lines to handle "空行は無視し"
const validLines = lines.filter(line => line.trim() !== '');

if (validLines.length === 0) {
  console.log('pairs=0');
  return;
}

const targetStr = validLines[0].trim();
// Spec guarantees a target value is given on line 1.
const target = BigInt(targetStr);

const map = new Map<bigint, bigint>();
let count = 0n;

for (let i = 1; i < validLines.length; i++) {
  const line = validLines[i].trim();
  
  // Check if the line is a valid integer string
  if (/^[+-]?\d+$/.test(line)) {
    const num = BigInt(line);
    const needed = target - num;
    
    if (map.has(needed)) {
      count += map.get(needed)!;
    }
    map.set(num, (map.get(num) ?? 0n) + 1n);
  }
}

console.log(`pairs=${count}`);
