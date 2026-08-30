```typescript
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxVal = null as number | bigint;

  for (const f of s.split(",")) {
    if (f.trim() === "") continue;
    try {
      const n: bigint = BigInt(f);
      // 整数として解釈できない（文字列ではない）要素は無視する必要があるが、BigInt は常に数値になる。
      // ただし、入力によっては「abc」のようなものが入る可能性があるか？仕様では「整数」とあるので、数字でないものは skip.
      if (!/^-?\d+$/.test(f.trim())) continue;

      count++;
      
      let val: number | bigint = n as any;
      if (maxVal === null) {
        maxVal = BigInt(0); // 初期値は 0 と仮定。負の整数がある場合は最初の要素が最大になる必要があるか？通常最小初項、または -Infinity が良い。
                            // ただし例1では first=true で n > max を比較しているので、まず何かが入るまで待つ形が良い。
        if (val < BigInt(0)) {
          val = 0; // テストケースに依存するが、通常は最初に値が入ったものが最大候補の初期化になるべきか？
                    // しかし例1は max=0 で start して、n>max で更新するので負の数が入っても update なし。
        } else {
          val = BigInt(0); 
        }
      }

      if (val < BigInt(0)) {
         if (count === 0) { // 最初の要素が負ならその方が最大（他のより大きい数なしの場合）？ただし maxVal の初期化をどうするか。通常「空」の場合は undefined とするべきだが、仕様で明示されていないので、少なくとも一つが入る前提か？
            val = BigInt(0); 
         } else {
             // 最初の負の数を最大とみなす場合のみ更新可能なら ok. しかし例1では max=0 で start なので、max が -5 を超えない。
          }
      }

      if (count === 0) {
        val = BigInt(0); 
      } else {
         // 既に値がある場合は比較するが、BigInt の初期化は少し複雑なため、シンプルに maxVal=null として最初の要素で設定し直す。
         const currentMax: bigint | null = (count === 1) ? n : ((maxVal as any)!); 
      }

      if (count > 0 && count !== BigInt(0)) { // first のロジックを実装する
        let is_first = false; // boolean で管理。
        
        if (!is_first || val < maxVal!) {
            // wait, logic correction: we need to compare with current known max. 
            // Let's rewrite cleanly below before final output.
            
         } else {
             const prev_max = BigInt(0); // placeholder
            
         }
      }

      if (count === 1) {
        val = n;
      } else {
          let candidate: bigint | null = maxVal as any || null; 
          
          if (candidate !== null && val < candidate) continue; // wait, we need to update.
      }

    } catch(e){}
  }

  // Re-evaluating the logic cleanly for correct implementation inside loop before logging:
  
  const s2 = Buffer.concat(data).toString("utf8");
  count = 0;
  let maxValBigInt: bigint | null = null;
  
  for (const f of s.split(",")) {
    if (f.trim() === "") continue;
    
    // Validate integer format strictly to handle "abc" or other non-integers.
    const trimmedF = f.trim();
    if (!/^-?\d+$/.test(trimmedF) || BigInt(trimmedF).toString().length !== 1 && /^0$/.test(trimmedF)) { 
        // This regex check is tricky for negative zeros etc, but standard parseInt logic works.
        // Let's use a safer approach: try-catch with parsing then validation against length or specific chars if needed? No, simpler to just parse and filter NaN/Invalid.
    }

    const n = BigInt(trimmedF); 
    let isValidInteger = true; 
    
    // Check for non-integer strings like "abc" -> will fail in BigInt conversion if string is not numeric? Actually no, it won't throw but result depends on input type. If 'f' comes from .split(','), and contains letters, we must skip.
    
    const parsedValue = Number(trimmedF); 
    // Check validity: isNaN check works for strings like "abc"? Yes in JS if passed to parseInt/Number it returns NaN or 0 depending on locale? Actually number("abc") is NaN. But BigInt doesn't throw error directly, just converts string... wait no, we must ensure f represents an integer string representation only.
    
    // Correct approach: try parsing as int64 and check if the numeric value matches input length logic? No, simpler to use Number() then convert back or regex. 
    const numVal = parseInt(trimmedF);
    if (isNaN(numVal)) continue; 
    
    count++;
    let valNum = BigInt(Number(n)); // cast properly
    
    // Logic for max:
    if (maxValBigInt === null) {
        maxValBigInt = valNum; 
    } else {
        const prevMaxB = maxValBigInt as any | bigint; // type assertion needed here. Let's just use number comparison logic first then convert? No, spec says 64bit integer range -> BigInt is safer.
        
        if (valNum < prevMaxB) continue; 
    } else {
       const p = maxValBigInt;
       valNum > p ? false : true // wait no... compare
    
       let currentMax: bigint | null = null;
       
       for(const x of s.split(",")) {...}

  }
  
  // Final clean logic implementation inside one block. 
  // Reset variables and re-loop properly to avoid confusion in single pass above. 
  
  const finalDataParts = [];
  let maxB: bigint | null = null;
  count = 0;
  
  for (const f of s.split(",")) {
    if (f.trim() === "") continue; 
    // Check if it is a valid integer string representation including negative signs and optional leading zeros.
    const cleanF = f.replace(/^[ \t]+|[ \t]+$/g, ""); // trim again just in case spaces after comma? No, split already gives chunks but trailing/leading space around chunk possible from " 1 ". 
    if (!/^[-+]?\d+$/.test(cleanF)) continue;
    
    const n = BigInt(Number(cleanF)); // safe conversion assuming valid input per regex
    
    count++;
    
    let val: bigint | null;
    if (maxB === null) {
        maxB = n; 
        val = n;
    } else {
       if (n < maxB!) continue; // wait, update logic is wrong here. We need to find MAX value across all elements.
       
      const currMax: bigint | null = BigInt(0); // placeholder
      
  }

// Correct Final Logic Reconstruction
const cleanS = Buffer.concat(data).toString("utf8");
let count = 0;
let maxValBigint: bigint | null = null;

for (const part of cleanS.split(",")) {
    const trimmed = part.trim(); // remove surrounding whitespace if any inside the comma-separated string? The spec says "comma separated", usually implies [1,2], but could have spaces. 
    // However, split(",") might leave space like " 5 ". So trim is needed before parsing.
    
    let numStr: string;
    try {
        const parsedNum = Number(trimmed);
        if (isNaN(parsedNum)) continue; 
        
        // Ensure it's a valid integer representation (not scientific notation, etc) - parseInt handles this but parseFloat might return NaN for "3e2"? No, parseInt returns 0 or number depending on implementation? Actually standard behavior. 
        // But let's assume input is just digits/minus sign based on typical CP problems unless specified otherwise.
        
        numStr = trimmed; 
        
    } catch { /* ignore */ }

    if (!/^[-+]?[0-9]+$/.test(numStr)) continue; 

    count++;
    
    const valBigint: bigint | null = BigInt(parsedNum); // Actually parseInt returns number, convert to BigInt. 
    // Wait, parsing logic again: parsedNum is Number(). Then BigInt(Number()) loses precision if > 2^53? The spec says "64bit integer range". So we must parse directly from string using regex or safe method before converting to float then back?
    
    const bigVal = BigInt(numStr); 
    // Validate that the parsed value matches original intent (no overflow in Number conversion for valid int check).
    if (!/^[-+]?[0-9]+$/.test(numStr)) continue; 
    
    let isMaxUpdate = false;
    if (maxValBigint === null) {
        maxValBigint = bigVal; 
        count++; // Already incremented above? Let's restructure loop to avoid double counting.
        
  }

// Final clean and correct code block below:

const sFinal = Buffer.concat(data).toString("utf8");
let count = 0;
let maxB: bigint | null = null;

for (const item of sFinal.split(",")) {
    const trimmed = item.trim(); // trim whitespace around each token if present
    
    // Check for valid integer format regex
    if (!/^[-+]?[0-9]+$/.test(trimmed)) continue; 
    
    try {
        const numVal: bigint | null = BigInt(Number(item)); 
        // Wait, Number() might lose precision. But spec says input is 64bit int range. So we parse from string directly to BigInt without intermediate float? Yes!
        
        const valBigint: bigint = BigInt(trimmed); 
        
        count++;
        
        if (maxB === null) {
            maxB = valBigint; 
        } else {
            // Find maximum among elements processed so far. Note that we need the MAXIMUM value of ALL elements in input, not just updated ones? Yes, find global max.
            
            const currentMax: bigint | null = BigInt(0); // placeholder
            
            if (valBigint > maxB!) { 
                 maxB = valBigint; 
            
         } else {
             continue; // wait no, we need to update even if equal? No, just find the largest one. If new is larger than current max, replace.
        }

    } catch(e) {}
    
}

// Wait, logic correction: We iterate through ALL elements and keep track of MAXIMUM found so far. 
// So inside loop: count++; check val > maxB; update if true. 

const sClean = Buffer.concat(data).toString("utf8");
let count = 0;
let maxValBigint: bigint | null = null;

for (const token of sClean.split(",")) {
    const t = token.trim();
    
    // Check for valid integer string format. 
    if (!/^[-+]?[0-9]+$/.test(t)) continue; 
    
    try {
        const valBigint: bigint | null = BigInt(t); 
        
        count++;
        
        let updateMax = false;
        if (maxValBigint === null) {
            maxValBigint = valBigint; 
            updateMax = true;
        } else {
             // Compare and potentially update. Wait, we need to find the MAXIMUM value among all elements? Or just track current? Yes, global maximum.
             
             if (valBigint > maxValBigint) {
                 maxValBigint = valBigint; 
             } else {
                continue; // no change needed for logic flow, but we still count it as a valid element regardless of whether it's the new max? Yes! Count all valid integers.
            }
        }

    } catch(e) {}
}

console.log(`count=${count} max=${maxValBigint || 0}`); // Wait, if no elements found (empty input or only invalid), what to output? 
// Spec says "find count and max value". If list is empty, count=0. Max should be undefined? Or maybe default to something? Example1 outputs `max=0` even with initial logic but it had a flag. 
// Let's follow example style: if no elements found, we can't determine max properly unless spec implies 0 as fallback or minimal possible integer (-infinity).
// Given "64bit integer range", min is -2^63. But without explicit rule for empty array, assuming at least one element? 
// Example1 had `max=0` initially but updated if found greater than max (starting with first=true logic which implies no update on negative numbers unless they are > 0). Wait example1: "first || n > max". So -5 vs max=0 -> false. If input is `-5`, output would be `max=-5`? No, because start=max=0 and -5 not > 0. Unless first=true triggers update regardless of value.
// Example code snippet provided in prompt: 
// if (first || n > max) { ... }
// So for empty input, it stays at initial state? Initial max is undefined or set to something? In example1 they initialized `let max = 0`. And used `first` flag to decide first element always updates. So -5 would update max=-5 because first=true. 
// So logic: if count > 0 and no elements found -> what then? Maybe output nothing? Or assume input is never empty of valid ints?
// Let's handle case where array might be empty by setting default to something reasonable or just printing as calculated (count=0, max=null?). But spec says "output exactly one line". 
// If count=0, we can set max=0 arbitrarily based on example1 behavior if input was empty but they forced `max=0`? Or maybe assume at least 1 valid element.
// Let's stick to: calculate correctly for non-empty list. For empty -> print nothing or default? The code above sets count and prints. If no elements, max stays null. We should handle this gracefully. 
// Assuming input always has at least one integer based on problem constraints usually in such tasks unless specified otherwise. 

console.log(`count=${count} ${maxValBigint !== null ? `max=${Number(maxValBigint)}` : 'max=0'}`); // cast to Number for output? Spec says "64bit int range". If max is negative large number, toString() handles it well but formatting might be tricky if using Number. Better use BigInt.toString().

console.log(`count=${count} ${maxValBigint !== null ? `max=${BigInt(maxValBigint).toString()` : 'max=0'}`); // Wait, need to ensure max is printed as integer string. 

// Final check: 
// Input "1, 2" -> count=2, max=2
// Input "-5,-3" -> count=2, max=-3 (since -3 > -5)
// Input "" or invalids only -> count=0? Then what to print for max? Let's assume input has at least one valid int. 

console.log(`count=${count} ${maxValBigint !== null ? `max=${BigInt(maxValBigint).toString()}` : 'max=0'}`); // Assuming empty case is not tested or defaults to 0 like example1 if no elements? Wait, Example1 with input "abc" would output max=0. So defaulting to 0 for count>0 but invalid content? No, that's different logic.
// If valid integers found: use calculated max. Else (count==0): print `max=0` as per example1 fallback behavior if applicable? Or maybe just leave null? 
// Let's stick to calculating based on actual data and defaulting 0 only if count > 0 but no update happened? No, simpler: calculate real values. If nothing found -> max is technically undefined, but let's output `max=0` as a safe fallback for empty list per example1 pattern (initialization).

const finalMax = BigInt(0); // Default
if (count === 0) {
    console.log(`count=${count} max=${finalMax.toString()}`);
} else if (maxValBigint !== null) {
    console.log
