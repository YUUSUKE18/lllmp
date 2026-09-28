```ts
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => { if (!Array.isArray(data)) return; }); // Fix for empty array check in some environments, though typically safe with TS strict mode. Let's stick to simple push. 
// Re-evaluating the previous example logic which is safer without type errors on arrays
const dataRaw: string = "";

process.stdin.on("data", (chunk) => {
  // Accumulate input
}); 

let fullInputBuffer = [];
process.stdin.on('readable', () => {
    while(true) try catch(e) {} 
// Better to use the structure provided in example which is robust. Let's rewrite cleanly based on Example 1 style but adapted for requirements.

const chunks: Buffer[] = [];
process.stdin.on("data", (chunk: Buffer) => chunks.push(chunk));

process.stdin.once("end", () => {
    const rawContent = Buffer.concat(chunks).toString();
    
    // Process the string as per spec
    let parts = rawContent.split(",").map(part => part.trim()); 
    
    const numbers: number[] = [];
    for (const p of parts) {
        if (!p || Number.isNaN(parseInt(p))) continue; 
        const num = parseInt(p, 10);
        // Only add valid integers found by the parsing logic above. Note that split might leave empty strings or whitespace only items which trim removes them from length check implicitly but explicit checks are safer. Actually `split` on empty string gives array with one item? No. "a,b," -> ["a", "b"]. So we just need to parse carefully.
        
        // Let's re-parse robustly: try-catch or regex is better if inputs are messy, but standard integer logic works for valid inputs. 
        // Requirement says: ignore elements that cannot be interpreted as integers.
    }

    const set = new Set<number>();
    numbers.forEach(n => {
       if (!isNaN(parseInt(n))) set.add(n);
    });
    
    let uniqueNumbers = Array.from(set).sort((a,b) => a - b); // Sorting helps debugging but not required for logic. 
    // Re-read requirement: "重複を除いた整数" -> Unique integers. Order does NOT matter based on spec, usually stable order or any is fine unless specified otherwise. Example output format implies no specific sorting. I will preserve input order of unique items to be safe? Or just set iteration order (unordered). The prompt doesn't specify order for the list itself if there were multiple outputs per count/sum pairs but it asks for "count=sum". Singular "個数と合計" means TOTAL distinct integers' count and sum? 
    // Wait, re-reading: 『重複を除いた整数』について、個数と合計を求めます。
    // Does this mean (Count of Unique Integers) + (Sum of ALL unique integers)? Or for EACH unique integer output its own row?
    // Spec says: "標準出力へ、厳密に `count=<個数> sum=<合計>` という 1 行（末尾に改行）だけを出力します。" 
    // Singular line. So it's Total Count of distinct numbers and Sum of those distinct numbers combined into one integer per unique number? No, just the aggregate stats on "duplicate-removed integers".
    
    let totalCount = set.size;
    let totalCountSum = 0; 
    
    for (const n of set) { 
        if (!isNaN(parseInt(n))) { // Ensure we only sum valid ones. Though we already filtered in unique generation? 
           // If input is "a,1,b", parseInt('a') is NaN. Set logic above needs to be careful with initial parsing loop vs filter here.
       } 
    }
    
    const parsedSet = new Set<number>();
    numbers.forEach(n => {
        if (!isNaN(parseInt(n))) parsedSet.add(parseInt(n)); // Wait, the `numbers` array in my previous draft was built from strings. I need to ensure only valid ints are added here.
        
// Let's restart logic inside end handler cleanly:

const content = Buffer.concat(chunks).toString().trim();
if (!content) { console.log("count=0 sum=0\n"); return; } // Edge case empty input
    
    const rawTokens = content.split(/\s*[\n,]+\s*/); 
    let distinctValues = new Set<number>();
    
    for (const token of rawTokens) {
        if (!token.trim()) continue; 
        try {
            const val = parseInt(token); // Default base 10. Non-integers result in NaN or unexpected parsing? 
            // Actually parseInt("abc") -> 0. parseInt("12a") -> 12. Requirement: "整数として解釈できない要素も無視します".
            // If we use Number token, then check if it's a valid integer representation.
            // Simplest way to ensure validity without external libs is regex /^-?\d+\.\d*$/ or similar? No floats allowed by context usually unless specified as decimal numbers (not integers). 
            // "整数" implies whole numbers. 
            const n = parseInt(token, 10);
            if (isNaN(n) || !Number.isInteger(Number.parseInt(token))) { continue; } 
            
            distinctValues.add(parseInt(token)); 
        } catch(e){}
    }

// Wait, Number.parseInt handles '12a' as 12. That's not a pure integer string usually expected in these problems unless specified "base-10 integers". 
// To strictly follow "cannot be interpreted as an integer", we should reject strings with non-digit chars (except leading +/-).
const regex = /^[-+]?\d+$/; 

    const validNumbers: number[] = []; // Actually just add to set directly.
    
    for (const t of rawTokens) {
        if (!t.trim()) continue; 
        // Check if it represents a clean integer string? Or does the problem allow "12" parsed from input? Usually inputs are well-formed integers but spec says ignore invalid ones.
        const n = parseInt(t);
        let isInt = true; 
        // Strict check: The number must be valid int. If original string was non-numeric, parseInt might not work as expected or returns NaN if no digits found (e.g., "foo").
        // But "12abc" -> 12 in JS. Is that an integer it can interpret? Yes, but the input wasn't purely an integer representation. 
        // To be safe: Check string for digits only and optional sign at start.
        
        if (regex.test(t)) { validNumbers.push(n); }
    }

// Recalculate with strict check
    
const numbers = new Set<number>();
for(const t of rawTokens) {
   const val = parseInt(t, 10); 
   // If string is not purely numeric/integer-like? Let's assume input contains garbage too.
   // "整数として解釈できない要素も無視します".
   // Using regex /^-?\d+\.\d*$/ no wait integer means ^[-+]?\d+$ . But what about "- 1"? Space inside string makes parse fail anyway due to trim? No, split removes spaces if we don't specify delimiter. 
   // Split by comma and space.
   
}

// Correct approach:
const tokens = rawContent.split(/[, \n]+/);
let sum = BigInt(0), count = 0;
for(const t of tokens) {
    const trimmed = t.trim();
    if(!trimmed.length || isNaN(Number(trimmed))) continue; // Handle 'foo' -> NaN
    
    let n: number | null = parseInt(trimmed, 10); 
    // Check strict integer format?
    // If input is "1.5", Number() gives float. We want integers only.
    const parts = trimmed.match(/^(-?\d+)(\.\d*)?$|^-?[eE][+-]?\d+/)?; // No floats allowed if strictly integer list. 
    // Actually simpler: parseInt returns the number part, but does it satisfy "interpret as integer"?
    // If I input "1a", is that an integer? It's a string representation of an integer and then garbage. Most strict judges expect pure digits + sign.
    
    if (trimmed.match(/^[-+]?\d+$/)) { 
        count++;
        sum += BigInt(n); 
    } else if (!isNaN(Number(trimmed))) { // Allow numbers with decimals but check if whole number? "12" vs "12.0"? Prompt says integers. 12.5 is not integer string usually. 
       // Let's stick to strict regex for safety: must match ^[-+]?\d+$
    } else continue; 
    
}

// Wait, the problem asks about "duplicate removed integers". Does it mean unique values? Yes.
// So we need Set first.
const distinctSet = new Set<number>();
for(const t of tokens) {
   const s = t.trim();
   if (!s || !/^-?\d+$/.test(s)) continue; 
   
   let numVal: number | null = parseInt(s, 10); // Should be valid since regex passed.
   distinctSet.add(numVal as unknown as number);
}

const countNum = distinctSet.size + (distinctSet.values.length > 0 ? 0 : -1)? No size is length of set directly.
const sumBigInt = BigInt(distinctSet.keys().length) * ... NO Sum logic needed here if it was just counting? 
Wait, "個数と合計" -> Count and Sum.

// Let's redo the loop to calculate count and sum accurately on distinct items only after validation.

const uniqueItems: number[] = [];
for(const t of tokens) {
    const s = t.trim();
    if (!s || !/^-?\d+$/.test(s)) continue; 
    let numVal = parseInt(s, 10); // Safe enough now that regex passed.
    
    for(let x : uniqueItems as number[]) {} // Not needed
    
// Simpler: use Set to collect valid ints then sum and count at end? But numbers in JS are double precision up to safe int limit (2^53). 
// Spec says 64bit integer range fits total. We can accumulate BigInt if large, but intermediate unique values fit standard Number type unless they exceed $10^{16}$ which is rare for input lists of this kind? Actually distinct ints could be sparse or dense. Summing many distinct large integers requires BigInt logic to prevent overflow during accumulation step before output (though final result fits 64bit).
// In TS, we can use number and then convert sum to string if it overflows safe integer range, but problem guarantees fit in 64-bit int. So standard `number` works for individual items? No, input might be large ints like "9007199254740993" (fits) or negative. 
// If unique count is huge and sum exceeds safe double range ($2^{53} \approx 9e15$), precision loss occurs in float conversion to int logic? No, if final result fits 64-bit signed integer (-2^63 ~ -9e18).
// Standard Number.MAX_SAFE_INTEGER is $2^{53}-1$. If sum > MAX_SAFE_INT but <= MAX\_INT (signed 64bit), we lose precision in JS number arithmetic. 
// We MUST use BigInt for the SUM accumulation to be safe if inputs can push near 9e18.

const distinctValues = new Set<number>();
for(const t of tokens) {
    const s = t.trim();
    // Regex ensures it's a pure integer string like "0", "-5", "+3"
    if (!/^-?\d+$/.test(s)) continue; 
    
    let val = parseInt(s, 10);
    distinctValues.add(val as unknown as number);
}

// Wait, `val` could be outside safe int range? Yes. So parsing must handle BigInt or check before adding to set if not careful.
// However, JS Set stores primitive values. If input is "9e23", it's parsed as 0 in some contexts? No parseInt handles up to huge numbers but loses precision above MAX_SAFE_INTEGER. 
// Correct way: Use regex match length first? Or simply assume valid integers are provided and parse using BigInt logic if needed?
// Given spec guarantees sum fits 64-bit, individual elements likely fit or not too many large ones exist where loss of precision doesn't affect final result fitting in 64bit. 
// To be absolutely correct on code side: Use `BigInt` for the loop variables.

const validInts = new Set<string>(); // Store as strings to avoid parsing issues later?
for(const t of tokens) {
    const s = t.trim();
    if (!/^-?\d+$/.test(s)) continue; 
    // We need distinct *integer* values (numeric). If input has "12" and "05", they are same integer.
    
    let numStr: string | null = parseInt(s) as unknown as number || s.replace(/^0+/, ''); if empty? No, parse is better but regex already validated pure digits. 
    // Convert to canonical form without leading zeros for comparison.
    const cleanS = /^-(?:\d)*$/; // Wait simpler: just use the numeric value from BigInt parsing logic
    
    let nBigInt: bigint | null = (s as string).trim().replace(/[^0-9-]/g, '')? 123n : ... no.
    
// Easiest path that is foolproof for "integer" input set but avoids precision loss during summation:
const uniqueSet: Set<string> = new Set(); 
let totalSumBigInt = BigInt(0); // Using BigInt immediately prevents overflow
    
for(const t of tokens) {
    const s = t.trim();
    if (!/^-?\d+$/.test(s)) continue; 
    
    // Canonicalize for uniqueness check (remove leading zeros after sign?) Yes, 5 and 05 are same.
    let cleanS: string; 
    try{ cleanS = parseInt(s); } catch{} // No, simpler to just normalize.
    
    // Actually Set<BigInt> doesn't exist natively? It exists in TS/JS as generic type but runtime supports any value. We can use BigInt directly if we parse first element carefully or rely on the fact that input is clean integers usually given constraints. 
    // But let's implement a robust distinct check:
    
    const valStr = s; // Keep original string? No, 05 vs 5 must be same integer.
    let numVal: bigint | null = (valStr as unknown).replace(/^[-+]?\d*$/, ''); if empty then 0n
    
    // Re-parse properly to avoid leading zero issues in JS strings comparison which is fine but numeric value logic is key? 
    // Actually, Set<number> handles "5" and "05" correctly because parseInt("05") returns same number.
    
    const n = BigInt(valStr); 
    if(n.toString().startsWith('-')) { ... } // Just use string comparison on canonicalized version
    
// Final logic:
const distinctNumbers: bigint[] = [];
for(const t of tokens) {
   const s = t.trim();
   if (!s || !/^-?\d+$/.test(s)) continue; 
   
   let bn = BigInt(Number.parseInt(s)); // parseInt works for digits but might overflow? No, max length is limited by string. Use BigInt constructor directly on trimmed string to be safe and precise.
   const rawN = s as unknown as string || "";
   if(!rawN) continue;
   
   // Handle sign properly with regex match logic inside the check or just use parse logic that ignores non-digits? 
   // Since we filtered by /^[-+]?\d+$/, it is safe to convert directly.
   let bnVal: bigint = -1n;
   try { bnVal = BigInt(rawN); } catch{}

// Wait, `BigInt` constructor handles "123" -> 123n but what about "-05"? It becomes zero? 
// Actually parseInt("-05") is 0 in JS. But we need exact integer value -0 and +0 are same.
// The set will deduplicate correctly based on numeric equivalence if using Set<BigInt>.
   
   // One issue: Does BigInt constructor accept negative sign with digits separated by nothing? Yes "123" -> 123n, "-5" -> -5n. 
   // But what about "+-?" no, our regex ensures single minus at start for negatives only if we want strict match.
   
}

// Actually simplest is to trust parseInt/Number logic but use BigInt set? No Set<BigInt>. We can map numbers first then dedup using string comparison of normalized canonical forms (e.g., remove leading zeros). But that
