const input = process.stdin.read();
if (!input) {
  console.log('valid=0');
  return;
}
const text = input.toString();
const lines = text.split('\n');
let count = 0;
for (const line of lines) {
  const trimmed = line.trim();
  if (trimmed.length === 0) continue;
  if (/^\d+(?:,\d+)*(?:,)?$/.test(trimmed)) {
    count++;
  }
}
console.log(`valid=${count}`);
