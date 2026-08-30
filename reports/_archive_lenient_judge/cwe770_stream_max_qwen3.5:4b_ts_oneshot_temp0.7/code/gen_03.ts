const data: Buffer[] = [];
let maxVal: number | null = null;
process.stdin.on("data", (c: Buffer) => {
  if (!maxVal) c.toString("utf8"); // Ensure we have something to process initially, though not strictly needed for end handler logic below.
});
const getProcessedString = () => data.map((chunk) => chunk.toString()).join("");

process.stdin.on("end", async () => {
  const s: string = await new Promise<string>((resolve) => resolve(getProcessedString()));
  // Split by comma, trim and parse integers only. Handle empty input gracefully.
  
  let count = 0;
  maxVal = null;

  if (s.length > 0 && /[^\d,-]/.test(s)) {
    // If there are non-numeric/non-comma characters other than whitespace/commas, 
    // the problem says "interpret as integer", implying valid input mostly but we should be robust.
    // The prompt implies standard inputs like "123, 456". Let's stick to splitting by comma and trimming spaces/empty strings.
  }

  const parts = s.split(",").map((str) => {
    return str.trim();
  }).filter(str => str.length > 0); // Filter out empty strings resulting from consecutive commas or leading/trailing ones if any logic differs, but split handles trailing usually fine unless string ends with comma without value? 
  // Actually `split` keeps the last element even if it's empty. Let's use filter to ensure valid tokens.
  
  const numbers = parts.filter(str => {
    return /^\d+$/.test(str); // Check if purely digits (positive integers). Problem doesn't specify negative handling explicitly but "integer" usually implies signed. 
                             // However, standard test cases for such prompts often imply non-negative or simple parsing. 
                             // Let's assume general integer support (-123) just in case to be safe with `parseInt` logic used in example if needed?
                             // Re-reading prompt: "空白区切りの整数列" (whitespace-separated integers). Here it is comma separated.
                             // I will use parseInt which handles negative signs and whitespace around digits automatically after trim.

    const n = parseInt(str, 10);
    return !Number.isNaN(n) && Number.isFinite(n); 
  });

  if (numbers.length === 0) {
    console.log(`count=0 max=` + ((maxVal !== null ? String(maxVal) : "null") ?? "")); // If no valid numbers, what to output? Example didn't show this case. Assuming at least one number or count=0 with appropriate max handling. 
                             // Given the example logic `first` flag handles empty arrays implicitly by keeping first=true and printing 0 if loop never enters or initializing correctly.
    console.log(`count=${numbers.length} max=` + (maxVal ?? "null")); 
  } else {
      count = numbers.length;
      let currentMax = -Infinity; // Start with a very small number to ensure any integer > this updates it? Or use first element logic like example.
                                  // Example used: if(first || n > max) ... init max=0, first=true. 
                                  // If inputs are negative integers (e.g., -5), starting max at 0 is incorrect unless we know they are non-negative.
                                  // The prompt says "64bit integer", which includes negatives.
      let foundFirst = false;

      for (const num of numbers) {
          if (!foundFirst || num > currentMax) {
              currentMax = num as number; 
              foundFirst = true;
          }
      }
      
    maxVal = typeof Number.MAX_SAFE_INTEGER === 'number' ? Math.max(currentMax, -Infinity) : undefined; // Just keep the calculated max

     console.log(`count=${numbers.length} max= ${maxVal}`);
  }
});
