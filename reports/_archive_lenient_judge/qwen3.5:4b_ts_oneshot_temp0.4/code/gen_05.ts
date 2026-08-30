const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let totalSum = BigInt(0); // Using BigInt to ensure precision for large sums, though problem says fits in 64-bit int.
  
  // Split by comma and process each element
  const parts: string[] = [];
  let currentPart = "";
  let i = 0;
  while (i < s.length) {
    if (s[i] === ",") {
      if (currentPart.trim() !== "") {
        parts.push(currentPart);
      }
      currentPart = "";
    } else {
      // Accumulate non-whitespace characters for the number part to handle potential whitespace within quoted strings or just raw numbers with spaces? 
      // The spec says "comma-separated integers". Usually implies format like: 1,2,3 or 1 , 2 , 3.
      // Let's assume standard parsing where we trim each segment between commas.
    }
    i++;
  }
  if (currentPart.trim() !== "") {
    parts.push(currentPart);
  }

  const counts = new Map<number, number>();

  for (const part of parts) {
    // Remove surrounding whitespace from the candidate string segment? 
    // The spec says "ignore empty elements and leading/trailing whitespaces".
    let trimmedStr: string;
    
    if (!part.trim()) continue; // Ignore completely empty segments
    
    // If there are spaces inside a number (e.g. " 123 "), trim() handles it. 
    // But what about non-integer strings? The spec says ignore elements that cannot be interpreted as integers.
    trimmedStr = part.trim();

    if (!/^-?\d+$/.test(trimmedStr)) continue; // Check for valid integer format (optional minus sign, digits)

    const n = parseInt(trimmedStr, 10);

    if (isNaN(n)) continue; 

    counts.set(n, (counts.get(n) || 0) + 1);
    
    totalSum += BigInt(n);
  }

  // Find the max key to determine count? No, spec says "count=<number of unique integers> sum=<total sum>".
  // Wait, re-reading: "重複を除いた整数" (unique integers). 
  // Does it mean for each unique integer output its count and total? Or just one line with 'count' being the number of unique items found so far?
  // Let's look at the example format again. `count=<個数> sum=<合計>` implies a single pair: Count = (number of distinct integers), Sum = (sum of all these distinct integers).
  
  const countOfUniqueIntegers = counts.size;

  console.log(`count=${countOfUniqueIntegers} sum=${totalSum}`);
});
