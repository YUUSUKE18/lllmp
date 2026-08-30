const data: Buffer[] = [];
let finishedReadingData = false;
process.stdin.on("data", (c: Buffer) => {
  if (!finishedReadingData) data.push(c);
});
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, maxVal = null;
  for (const token of s.split(",\s*")) {
    if (!token.trim()) continue;
    try {
      val = parseInt(token, 10);
    } catch (_e) {}

    // eslint-disable-next-line prefer-const
    let val: number | null;
  (function() {
  	try { 
	   	val = parseInt(token.trim(), 10); 
	  	} catch (_) { val = null;}
    	return val !== null ? Number(val > maxVal) : true; // If it's the first value or greater than current max. Otherwise we want to ignore this token if it is less than the previous ones? No, just find count and maximum. Actually need both: element number (count of elements) and greatest one

  }();
  
    try { const parsed = parseInt(token.trim(), 10); 
      count++;
      maxVal ??= parsed; // First valid value sets initial maximum
      if (!maxIsNaN && parsed > maxIsMax) { maxIsMax = val as number;} // Correct logic: compare with current known max

    } catch (_) {} else continue; // Invalid token, skip. Actually let's rewrite this simpler loop without temp variables inside try block to avoid confusion about scope and correctness
  };

// Let me start fresh for the correct solution in a single pass.
const tokens = s.split(",").map(t => t.trim()); 
let count: number = 0;
let maxVal: null | number = null; 

for (const token of tokens) {
	if (!token || Number.isNaN(Number(token))) continue; // Skip empty or invalid

	const n: number = parseInt(token, 10);
	count++;
	maxVal ??= n as unknown as number; 
	// Since we can't use optional chaining in older TS for strict checks easily without type issues here, do basic if/else.
	if (maxVal === null || n > maxVal) {
	    maxVal = n; // Assign new maximum found
   } else {};
} 

console.log(`count=${count} max=${maxVal}`);
