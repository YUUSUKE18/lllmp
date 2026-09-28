const input = process.stdin.read().split('\n');

let count = 0;
let sum = 0n;

// Iterate from index 1 (Line 2 onwards) as per specification
for (let i = 1; i < input.length; i++) {
  const line = input[i].trim();
  
  // Ignore empty lines
  if (!line) continue;

  try {
    // Try to parse as BigInt directly. 
    // This handles valid integers and throws for non-integers (e.g., floats, hex, scientific notation).
    const num = BigInt(line);
    count++;
    sum += num;
  } catch (e) {
    // Ignore lines that cannot be interpreted as integers
  }
}

console.log(`count=${count} sum=${sum}`);
