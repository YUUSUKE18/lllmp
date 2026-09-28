const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n");
  
  if (lines.length < 2 || !lines[0] || !isNaN(parseFloat(lines[0]))) return console.log("pairs=0\n");
  
  const target = parseFloat(lines[0]);
  const nums: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i]) continue;
    const val = parseInt(lines[i].trim(), 10);
    if (isNaN(val)) continue;
    if (Number.isInteger(val)) nums.push(val);
  }

  let pairs = 0n;
  if (nums.length < 2) {
    console.log("pairs=0\n");
    return;
  }

  // Two pointer approach on sorted array to handle duplicates and efficiency
  // We need to handle 64-bit integers, so using BigInt logic where possible or careful arithmetic.
  // Sorting is O(N log N), which is efficient enough.
  
  const n = nums.length;
  if (n > 2) {
    nums.sort((a, b) => a - b);
    
    let left = 0;
    let right = n - 1;
    
    while (left < right) {
      // Check for overflow/underflow before subtraction/multiplication if necessary, 
      // but since we are looking for sum = target, we can just compute.
      // Since values fit in 64-bit int, their sum might exceed 2^53 safe integer range in JS numbers,
      // so we must use BigInt for the calculation to be precise with large integers.
      
      const sumBigInt = (BigInt(nums[left]) + BigInt(nums[right]));
      if (sumBigInt < BigInt(target)) {
        left++;
      } else if (sumBigInt > BigInt(target)) {
        right--;
      } else {
        // Found a pair
        pairs++;
        
        // Handle duplicates of current elements to count all valid pairs efficiently
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        
        // Move past the matched pair
        if (nums[left] !== nums[right]) {
          left++;
          right--;
        }
      }
    }
  } else if (n === 2) {
    const sum = BigInt(nums[0]) + BigInt(nums[1]);
    if (sum === BigInt(target)) pairs++;
  }
  
  // Handle negative target and potential large inputs correctly via BigInt logic
  // The logic above covers all cases where left < right.

  console.log(`pairs=${pairs}\n`);
});
