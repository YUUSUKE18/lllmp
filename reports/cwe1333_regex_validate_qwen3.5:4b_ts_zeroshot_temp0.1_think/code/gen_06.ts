const input = process.stdin.read();
if (!input) {
  console.log('valid=0');
  return;
}

const lines = input.split('\n');
let count = 0;

for (const line of lines) {
  const trimmed = line.trim();
  
  // Empty line is invalid
  if (trimmed.length === 0) {
    continue;
  }
  
  // Check if contains only digits and commas
  if (!/^[0-9,]+$/.test(trimmed)) {
    continue;
  }
  
  const parts = trimmed.split(',');
  let isValid = true;
  
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    
    if (i === parts.length - 1) {
      // Last part: can be empty or digits
      if (part.length > 0 && !/^\d+$/.test(part)) {
        isValid = false;
        break;
      }
    } else {
      // Non-last part: must be non-empty digits
      if (part.length === 0 || !/^\d+$/.test(part)) {
        isValid = false;
        break;
      }
    }
  }
  
  if (isValid) {
    count++;
  }
}

console.log(`valid=${count}`);
