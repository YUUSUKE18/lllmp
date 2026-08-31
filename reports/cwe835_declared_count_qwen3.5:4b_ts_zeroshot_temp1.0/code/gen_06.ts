import * as readline from 'readline';

const rl = readline.createInterface({
  inputType: 'line',
  outputType: 'string'
});

rl.on('line', (line) => {
  const tokens = line.split(/\s+/);
  let expectedCount = parseInt(tokens[0]);
  
  // Expected count could be non-integer or invalid format, but we only care about reading existing integers.
  // If the first token is not a valid integer, it's treated as garbage and ignored? 
  // The spec says "the number of subsequent integers" is written on the first line. 
  // Usually this means the count itself must be an integer. Let's assume input format implies valid numbers where needed,
  // but strictly speaking, if the count token isn't a number, we can't proceed as expected.
  // However, "整数の個数" (number of integers) implies it should be an integer. 
  // Let's handle cases gracefully: if expectedCount is not a valid positive integer, we treat it as invalid and ignore that line? 
  // But the prompt says: "Actually read integers only". So we just parse numbers from subsequent lines ignoring others.
  // The first line's value determines the 'count' variable conceptually but since we are ignoring non-integer rows anyway...
  
  // Actually, re-reading spec: "Standard input line 1 contains the number of subsequent integers"
  // So if that value is invalid (not a number), it might be treated as garbage. 
  // But let's assume standard competitive programming style: the first line has N, then N lines follow with one int each.
  // BUT spec says "Actually read integer only". So maybe N could be wrong?
  
  // Let's try to parse everything strictly. If line doesn't contain an integer or isn't a single integer?
  // Wait: "2 行目以降に整数が 1 行に 1 個ずつ並びます" -> "Integers are arranged one per line from line 2 onwards"
  // This implies all lines from 2 onwards are valid integers. 
  // BUT also: "However, the number of actual integers may not match the value on line 1."
  // AND: "Ignore empty lines and lines that cannot be interpreted as integers".
  
  // So strategy:
  // 1. Read all input until EOF.
  // 2. Split into lines.
  // 3. Ignore any line that is not a valid integer (including empty lines, spaces, text).
  // 4. Count how many valid integers we found. Let this be 'actualReadCount'.
  // 5. Sum them up.
  // 6. Output format: count=<actualReadCount> sum=<sum>.
  
  // The first line's value is essentially ignored for the output's count? 
  // Yes, because spec says "Based on actually read integers only". 
  // So we don't need to use the expectedCount variable at all, except maybe for debugging or if it affects logic? No.
  // We just parse ALL lines and extract valid integers.
  
  // Wait, does the first line itself count if it contains an integer?
  // "2 行目以降" means lines starting from 2nd line. 
  // So we skip line 1 completely for data extraction.
  
  // Revised Plan:
  // - Read stdin completely (or line by line).
  // - Skip the very first line (index 0).
  // - Process remaining lines.
  // - If a line can be parsed as an integer (parseInt works and matches full string? or just numeric?), add to list.
  // - Note: "整数として解釈できない行も無視します" -> Ignore lines that are not integers.
  // - How to check if a line is an integer? Use try-catch with BigInt or Number parsing? 
  //   Since values fit in 64-bit, Number is fine, but to avoid precision issues, maybe use parseInt and check if result string === original trimmed?
  //   Or simpler: try parse. If success, it's an integer.
  //   But what if line is "123abc"? Not an integer.
  //   What if line is "" or " "? Not an integer.
  
  // Algorithm:
  // 1. Read lines from stdin.
  // 2. Skip first line (if it exists).
  // 3. For each subsequent line, trim it. If empty, skip.
  // 4. Try to parse as integer. If successful, convert to number/BigInt and add to sum, increment count.
  //    How to verify it's an integer? 
  //    - Check if the trimmed string is a valid representation of an integer.
  //    - Regex: /^\s*-?\d+\s*$/ (ignoring surrounding whitespace, but we already trimmed).
  //    - So /^-?\d+$/ check.
  
  // Let's implement this robustly.
  
  const lines = input.split('\n');
  
  if (lines.length === 0) {
    return;
  }
  
  // Skip first line (index 0)
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue; // Ignore empty lines
    
    // Check if it is a valid integer string
    // Regex for integer: optional minus sign followed by one or more digits.
    if (/^-?\d+$/.test(line)) {
      const num = parseInt(line, 10); // safe because regex ensures format
      
      // Accumulate
      sum += num;
      count++;
    } else {
      // Ignore non-integer lines as per spec: "整数として解釈できない行も無視します"
      // But wait, what if the line is "hello"? It's not an integer -> ignore.
      // What if it's a float like 12.5? Regex /^\d+$/ or /^-?\d+$/ rejects it. Correct.
    }
  }
  
  console.log(`count=${count} sum=${sum}`);

  // Wait, I need to handle the input reading logic. The provided code block is just the solution body.
  // I should wrap the reading in a main loop or event listener.
  // Let's restructure for Node.js stdin handling properly without external deps.
  
  process.stdin.on('data', (chunk) => {
    const input = chunk.toString();
    // Combine multiple chunks if necessary? Usually split('\n') works line by line.
    // But better to read all first or process line by line.
    // Given the spec "standard input", we can just pipe data to readline.
  });

  // Actually, let's restart the logic with proper stdin reading.
  // The previous snippet was inside a callback but I didn't define 'input'.
  // Let's rewrite cleanly.
  
  const input = process.stdin;
  let allInput = '';
  
  input.on('data', (data) => {
    allInput += data.toString();
  });
  
  input.on('end', () => {
    const lines = allInput.split('\n');
    
    // Skip first line entirely. 
    // Even if the first line is empty? "Standard input line 1 contains..." -> implies it exists.
    // But spec says "Ignore...". So if line 1 is empty, skip it anyway (as per general ignore rule?).
    // Spec: "Line 1 has count... Line 2 onwards have integers... Ignore empty lines".
    // So we treat all lines after skipping the first one (regardless of content).
    // Wait, does "skip first line" apply even if it's garbage? 
    // The spec says "Standard input line 1 contains...". So it's the structure.
    // We should definitely skip the first line as a delimiter/counter indicator that we don't use for output count.
    
    const dataLines = [];
    if (lines.length > 0) {
      dataLines.push(...lines.slice(1));
    } else {
      dataLines.push(''); // Handle empty input gracefully?
    }
    
    let count = 0;
    let sum = 0; // Use BigInt for safety with 64-bit sums? Spec says values fit in 64-bit, so sum might exceed.
                  // "Values are within 64-bit range". Sum of many such values can exceed 64-bit.
                  // Node.js Number is double precision. If sum exceeds 2^53, precision loss occurs.
                  // Better to use BigInt for sum and count? Or just Number if constraints say total fits? 
                  // "Values... within 64-bit integer range". Does not guarantee sum fits in 64-bit.
                  // But spec output format doesn't specify type of <sum>. 
                  // To be safe, let's use BigInt for accumulation and conversion back to string.
    
    for (const line of dataLines) {
      const trimmed = line.trim();
      
      if (!trimmed) continue; // Ignore empty lines
      
      // Check if valid integer format: optional sign + digits only
      if (/^-?\d+$/.test(trimmed)) {
        // It is a string representation of an integer.
        // We can parse it as a number or BigInt.
        // Since input fits in 64-bit, Number.parse is okay for the individual value, 
        // but sum might overflow. Let's accumulate using BigInt logic manually or convert result to BigInt.
        
        const num = BigInt(trimmed); // Safe parsing
        count++;
        sum += num;
      }
    }
    
    console.log(`count=${count} sum=${sum}`);
  });
