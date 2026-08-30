const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  let target: number | null = null;
  const numbers: Set<number> = new Set();
  const countMap = new Map<number, number>(); // Store {sum, count}
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    
    try {
      const num: number = parseInt(line, 10);
      if (isNaN(num)) continue;
      
      if (i === 0 && target === null) {
        target = num;
        continue;
      } else if (numbers.has(num)) {
        // Add to count map
        const existingSum = i + (target - num); // sum of current row and previous rows? No.
        
        // Correct approach:
        // We need two indices j > i such that nums[j] + nums[i] == target
        
      } else if (!numbers.has(num)) {
        numbers.add(num);
      }
    } catch (e) {
      continue;
    }
  }
  
  let pairs = 0;
  
  // Brute force approach: O(n^2)
  // Since n is not specified but values are 64-bit, n can be large.
  // However, if n is too large, O(n^2) will TLE.
  // But without constraints on N, we assume N is reasonable for O(n^2) or use a hash map approach.
  
  // Re-reading spec: "整数が 1 行に 1 個ずつ並びます" -> One integer per line.
  // We need to read all integers first, then process.
  
  const nums: number[] = [];
  let targetVal: number | null = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    
    try {
      const num: number = parseInt(line, 10);
      if (isNaN(num)) continue;
      
      if (i === 0) {
        targetVal = num;
      } else {
        nums.push(num);
      }
    } catch (e) {
      continue;
    }
  }
  
  if (targetVal === null || nums.length < 2) {
    console.log("pairs=0");
    return;
  }
  
  let pairCount = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === targetVal) {
        pairCount++;
      }
    }
  }
  
  console.log(`pairs=${pairCount}`);
});
