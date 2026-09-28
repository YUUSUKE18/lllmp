const input = process.stdin.read();
if (!input) {
  console.log('count=0 sum=0');
  return;
}

const lines = input.split(/\r\n|\n/);
// Skip the first line which contains the count metadata as per spec "Line 2+ contain integers"
if (lines.length > 0) {
  lines.shift();
}

let count: bigint = 0n;
let sum: bigint = 0n;

for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed) continue;

  // Check if the line is a valid integer string
  // Allow optional leading + or - sign, followed by digits
  if (/^[-+]?[0-9]+$/.test(trimmed)) {
    count++;
    sum += BigInt(trimmed);
  }
}

console.log(`count=${count} sum=${sum}`);
