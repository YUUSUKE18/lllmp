const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let maxCount = new Map<number, number>(); // count map
  let sumMap = new Map<number, bigint>();   // sum map

  for (const f of s.split(",")) {
    if (!f.trim()) continue; 
    try {
      const n: bigint = BigInt(f);
      maxCount.set(Number(n), (maxCount.get(Number(n)) || 0) + 1n);
      sumMap.set(Number(n), (sumMap.get(Number(n)) ?? 0n) + Number(~~n)); // Sum up individual number

    } catch {} 
  }

  let result = [];
  
   for (const n of maxCount.keys()) {
     const count = maxCount.get(n);
      if (!count || isNaN(NaN(count))) continue; 

result.push(`${count} ${maxCount.get(Number(~~n))}`) as [string]; // push to array

  }
    
  
   for (const n of sumMap.keys()) {
    result.push(sumMap.get(Number(n)).toString());
  }

console.log(`sum=${result.join("+")}`);
});


// Example test input: 
/*
1,2,3,4,5,,6,,,7
*/
