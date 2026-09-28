const input = process.stdin.read();
if (!input) {
  console.log('valid=0');
  return;
}

process.stdin.setEncoding('utf8'); // Ensure string type if not already set

const lines = input.split('\n');
let count = 0;

for (const line of lines) {
  const trimmed = line.trim();
  
  // Empty line or whitespace-only line is invalid
  if (trimmed === '') {
    continue;
  }

  // Regex: 
  // ^\s* : Start with optional whitespace (ignored per spec)
  // (\d+) : Must have at least one number sequence
  // (?:,\d+)* : Followed by zero or more comma-digit pairs
  // (?:,)?   : Optionally end with a trailing comma
  // $       : End of string
  // This ensures only digits and commas are used inside the content.
  const regex = /^\s*(\d+)(?:,\d+)*(?:,)?$/;

  if (regex.test(trimmed)) {
    count++;
  }
}

console.log(`valid=${count}`);
