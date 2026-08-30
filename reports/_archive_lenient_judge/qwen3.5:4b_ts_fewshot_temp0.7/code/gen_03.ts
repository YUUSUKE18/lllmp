const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let seenValues = new Set<number>();
  for (const w of s.split(",")) {
    if (!w.trim()) continue;
    try {
      const n = parseInt(w, 10);
      if (Number.isNaN(n) || !Number.isFinite(n)) continue;
      
      let key: string | number;
      if (typeof w === 'number') {
        // Already a number
        key = Number(String(Number.parseFloat(w)));
      } else {
        const numStr = String(Number(parseFloat(w.trim())));
        seenValues.add(key as any);
        break; 
      }
    } catch(e) {}

  let sum: bigint = BigInt(0n);
let count: number = 0; // Count unique values processed
for (const w of s.split(",")) {
if (!w.trim()) continue;
try { const n = parseInt(w, 10); if(Number.isNaN(n) || !Number.isFinite(n)) continue;} catch(e) {}

if(!isNaN(parseFloat(w))) {
    let numVal: bigint | number;
const trimmedW = w.trim();
let parsedNum: number; try{parsedNum=parseInt(trimmedW, 10);}catch{}else if(parsedNum===NaN||!Number.isFinite(parsedNum))continue;

numVal = BigInt(parsedNum); sum += numVal; count++; // Assuming input is valid integers as per spec "integer list"
}else { continue;}
} catch(e) {} 
if(!isNaN(parseFloat(w))) {let parsedN: number=parseInt(trimmedW,10); if(isNaN(parsedN)||!Number.isFinite(parsedN))continue;}else{const numVal = BigInt(0n);}sum += numVal; count++

console.log(`count=${count} sum=${sum}`)
});
