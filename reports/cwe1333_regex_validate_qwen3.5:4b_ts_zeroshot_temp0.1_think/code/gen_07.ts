const input = process.stdin.read();
if (!input) {
  console.log('valid=0');
} else {
  const lines = input.toString().split('\n');
  let count = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    
    if (trimmed === '') {
      continue;
    }

    // Regex ensures:
    // 1. Starts with at least one digit ([0-9]+)
    // 2. Followed by zero or more groups of comma + digits ((,[0-9]+)*)
    // 3. Optionally ends with a comma ([,]?)
    // This implicitly enforces only digits and commas are allowed, 
    // and ensures at least one digit sequence exists.
    if (/^[0-9]+(,[0-9]+)*[,]?$/).test(trimmed)) {
      count++;
    }
  }

  console.log(`valid=${count}`);
}
