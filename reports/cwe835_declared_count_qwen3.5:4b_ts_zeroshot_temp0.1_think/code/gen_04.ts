const input = process.stdin.read();
if (!input) {
  console.log('count=0 sum=0');
  return;
}

const lines = input.split('\n');
let count = 0;
let sum = BigInt(0);

// Skip the first line (index 0) as it contains the expected count metadata
for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  const trimmedLine = line.trim();
  
  if (!trimmedLine) continue; // Ignore empty lines

  try {
    const val = BigInt(trimmedLine);
    sum += val;
    count++;
  } catch (e) {
    // Ignore lines that cannot be interpreted as integers
  }
}

console.log(`count=${count} sum=${sum}`);
