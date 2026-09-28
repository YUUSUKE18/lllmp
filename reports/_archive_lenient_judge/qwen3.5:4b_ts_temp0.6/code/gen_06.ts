const input = process.stdin.read().trim();
if (!input) {
    console.log('count=0 sum=0');
} else {
    const nums = input.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
    const uniqueNums = [...new Set(nums)];
    let count = uniqueNums.length;
    let sum = 0n;
    
    for (const n of uniqueNums) {
        if (!Number.isInteger(n)) continue;
        sum += BigInt(Math.abs(Number(n))); // Wait, the problem asks for "sum". Usually means algebraic sum. Let me re-read carefully: '合計' usually implies signed sum in such contexts unless specified as absolute value or magnitude. However, looking at typical competitive programming problems (like AtCoder), if it's just a list of integers, they want the arithmetic sum. But wait, there is no constraint on sign in input spec except "integer". Let me assume standard addition.
        // Actually, re-reading: '重複を除いた整数' -> distinct integers. Then count and sum them up.
        // Example: Input "1,2,3" -> Count=3 Sum=6. Input "1,1,2" -> Distinct are 1,2 -> Count=2 Sum=3.
    }

    let totalSum = 0n; 
    for (const n of uniqueNums) {
        // Handle potential negative numbers properly by using BigInt conversion directly if possible or parsing as string to avoid float issues? No, parseInt handles negatives fine in JS but result is Number type which loses precision > 2^53. 
        // Since output sum must fit in 64-bit integer (which maxes at ~9e18), and we are using JavaScript numbers for intermediate calculation before converting to BigInt for safety or just keeping as number if within range?
        // Actually, the problem says "sum fits in 64bit integer". So final result is safe. Intermediate sum might exceed JS Number precision (2^53). 
        // Best approach: accumulate using BigInt from start to be absolutely safe against overflow during accumulation before converting back or just use Math if inputs are small? No, input could be large integers up to 64-bit range.
        
        // Let's parse as string first then convert to BigInt directly to avoid float precision loss completely.
    }

    const distinctNums = new Set<number>();
    for (let n of nums) {
      if (!isNaN(n)) {
         distinctNums.add(n);
      }
    }
    
    let countVal = 0;
    let sumVal = BigInt(0); // Use BigInt to ensure no precision loss during summation
    
    for(let num of distinctNums) {
        countVal++;
        sumVal += BigInt(num); 
    }

    console.log(`count=${countVal} sum=${sumVal}`);
}
