const input = process.stdin.read().trim();
if (!input) {
  console.log("count=0 sum=");
} else {
  const parts = input.split(",");
  if (parts.length === 0 || parts.some(p => p.trim() !== "")) {
    let uniqueNumbers: number[] = [];

    for (const part of parts) {
      const trimmed = part.trim();
      if (!trimmed.match(/^[\d-]+$/)) continue; // integer only check, including negative numbers
      try {
        const num = parseInt(trimmed);
        if (isNaN(num)) continue;
        
        uniqueNumbers.push(parseInt(trimmed));
      } catch {}
    }

    console.log(`count=${uniqueNumbers.length} sum=${uniqueNumbers.reduce((a, b) => a + b, 0).toString()}`);
  } else {
     // Handle case where no integers are found but input exists (e.g. all strings or empty list of valid numbers after filtering?) 
     // Re-evaluating: The spec says "整数として解釈できない要素も無視します".
     const parts = input.split(",");
    let uniqueNumbersSet = new Set<number>();

    for (const part of parts) {
      const trimmed = part.trim();
      if (!trimmed.match(/^[\d-]+$/)) continue; 
      
      // Ensure it's actually a number string before parsing
      try {
        const numVal = parseInt(trimmed, 10);
        uniqueNumbersSet.add(numVal);
      } catch (e) {}
    }

    console.log(`count=${uniqueNumbersSet.size} sum=${Array.from(uniqueNumbersSet).reduce((a,b)=>a+b,0)}.toString()}`); // Wait logic correction below
    
    const nums = Array.from(uniqueNumbersSet).sort((a,b)=>a-b);
    let totalSum = 0;
    for(let n of nums) {
        totalSum += n;
    }
    
    console.log(`count=${nums.length} sum=${totalSum}`);
  }
}
