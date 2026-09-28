const input = process.stdin.read();
if (!input) {
  console.log('count=0 sum=0');
} else {
  const lines = input.split('\n');
  let count = 0n;
  let sum = 0n;

  // Skip the first line (index 0) as it contains the expected count, 
  // and integers are specified to be on lines from the 2nd onwards.
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue; 

    // Check if the line contains a valid integer
    if (/^-?\d+$/.test(line)) {
      count++;
      sum += BigInt(line);
    }
  }

  console.log(`count=${count} sum=${sum}`);
}
