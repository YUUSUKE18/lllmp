const input = process.stdin.read();
if (!input) {
  console.log('count=0 sum=0');
} else {
  const lines = input.split('\n');
  let count = 0;
  let sum = 0n;

  // Skip first line (index 0) as it contains the expected count, not data
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue; // Empty line

    // Check if valid integer string
    if (/^-?\d+$/.test(line)) {
      count++;
      sum += BigInt(line);
    }
  }

  console.log(`count=${count} sum=${sum}`);
}
