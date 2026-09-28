const input = process.stdin.read().split('\n');
let count = 0;
let sum = BigInt(0);

for (let i = 1; i < input.length; i++) {
  const line = input[i];
  if (!line) continue;
  const trimmed = line.trim();
  if (trimmed === '') continue;

  // Check if the line contains a valid integer string
  if (/^[+-]?\d+$/.test(trimmed)) {
    const num = BigInt(trimmed);
    count++;
    sum += num;
  }
}

console.log(`count=${count} sum=${sum}`);
