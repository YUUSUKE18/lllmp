const input = process.stdin.read();
if (input === null) {
  console.log('count=0 sum=0');
} else {
  const lines = input.split(/\r?\n/);
  let count = 0n;
  let sum = 0n;

  // Skip Line 1 (index 0) as per spec "Lines 2+ to integers"
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    try {
      const val = BigInt(line);
      count++;
      sum += val;
    } catch (e) {
      // Ignore lines that cannot be interpreted as integers
    }
  }

  console.log(`count=${count} sum=${sum}`);
}
