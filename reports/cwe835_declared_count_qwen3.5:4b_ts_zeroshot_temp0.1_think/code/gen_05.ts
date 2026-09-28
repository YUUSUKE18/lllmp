const content = process.stdin.read();
if (!content) {
  console.log('count=0 sum=0');
  return;
}
const lines = content.split('\n');
let count = 0n;
let sum = 0n;

// Skip Line 1 as per "2nd line onwards contain integers"
for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue; // Empty line ignore

  // Check if it's a valid integer
  if (/^-?\d+$/.test(line)) {
    const val = BigInt(line);
    sum += val;
    count++;
  }
}

console.log(`count=${count} sum=${sum}`);
