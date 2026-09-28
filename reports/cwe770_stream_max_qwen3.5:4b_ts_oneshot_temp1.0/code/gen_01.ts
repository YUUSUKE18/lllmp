const data: Buffer[] = [];
let count = 0;
let maxNum = null as number | bigint; // Use number for safety unless specified range, but problem says 64bit int. Node.js numbers are safe up to 2^53 - 1 safely but can go wider with loss of precision if not careful, better use BigInt logic or just standard Number since inputs fit in JS SafeInteger usually implied or handle via string parsing carefully? The prompt says "values fall within the range of a 64-bit integer". JavaScript `Number` is safe up to ~2^53. If input can exceed that (e.g. full 64bit int like -9*10^18), standard Number might lose precision during calculation but max value logic still holds for display if we treat as string then convert? Actually, JS Number has max_safe_integer = 2^53-1 ~ 9e15. A full 64-bit integer can be up to ~9*10^18 which is larger than safe integer range but represents the same values precisely in IEEE754 double precision if small enough? Wait: JS Number uses IEEE754 Double Precision which supports exact representation for integers only down to 2^53. If inputs are large (e.g., 9,007,199,254,740,992), they can't be represented exactly as numbers without loss if > 2^53? Actually JS Number supports up to ~9*10^18 but loses precision above 2^53. Since the problem mentions "64bit integer range", we should probably use BigInt for exact arithmetic or at least ensure comparison is accurate. However, since Node.js's `Number` can represent integers safely only up to 2^53-1, if input exceeds that (e.g., 9*10^18), converting directly might lose precision when comparing? Actually no - JS Number conversion from string does not round-trip perfectly for large ints. But we don't need arithmetic operations beyond comparison and counting. We can use BigInt to be safe since the problem mentions "64-bit integer". Let's parse as string then convert using BigInt if needed, or just rely on `Number` but note it may lose precision for very large integers > 2^53? Wait: The maximum value of a signed 64-bit int is about 9.2e18 which is ~2^63-1. JS Number can represent up to 2^53 exactly (about 9e15). So if input contains numbers larger than that, we need BigInt for precision in comparisons? Actually JavaScript Numbers use double precision floating point, so they cannot distinguish between consecutive integers beyond about 9 quadrillion. But since the problem mentions "values fall within the range of a 64-bit integer", and typical coding problems might include values like 10^18, we should probably parse as BigInt to avoid any loss. However Node.js doesn't have native BigInt until ES2020, so modern environments support it fine (we assume this). Let's use `BigInt` for safety.

const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => {
  if (!c.length) return; // Should not happen usually but just in case
});
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8").trim();
  
  // Handle empty input gracefully
  let count = 0;
  let maxVal: bigint = BigInt(0); 
  bool first = true;

  for (const token of s.split(",")) {
    const cleanToken = token.trim();
    if (!isNaN(cleanToken) && !BigInt.isNaN(BigInt(cleanToken))) { // Actually we can just use try-catch or check directly since BigInt constructor throws on non-int strings
    
      count++;
      
      let num: bigint;
      try {
        const n = BigInt(parseFloat(cleanToken)); // Use parseFloat to ensure proper conversion? Or better, manually convert without float? 
      } catch (e) {} 

Let me fix this properly. We should avoid using `parseFloat` since it's also a double precision operation which might lose accuracy for very large integers? Actually `BigInt(parseInt(string))` is not correct because parseInt handles floating points differently? Better to use:

  const n = BigInt(Number(cleanToken));
  
Wait, Number() converts string to number and back loses precision if > 2^53. For example "9007199254740992" -> NaN as per earlier test case because it's exactly 2^53+something? Actually JS Number can represent up to 2^53 - 1 safely, but after that you start losing precision for larger integers. So better approach:

For each token, check if it looks like an integer (optional sign and digits only). Then convert using `BigInt(parseInt(token))` but again parseInt may not handle all cases? Actually we can use `try { const n = BigInt(Number(cleanToken)); } catch ...` or just parse manually? Simpler: assume inputs are valid integers as per problem. Use string manipulation to remove +/- signs and then construct BigInt via manual conversion if needed, but simplest way in modern TS is using `BigInt(String(cleanToken))`. But String->BigInt works directly without floating point! Yes! That's the key mistake earlier - I was thinking of parseFloat or Number() which uses double precision. Using `BigInt(string)` avoids any float loss since string-to-bigint conversion doesn't use floating points internally; it builds integer from digits safely.

Correct logic:
  const n = BigInt(cleanToken); // directly convert clean token to big int without losing precision for large ints up to full 64-bit range (or even larger)
  
But wait, what if the string is not a valid integer? The problem says "ignore elements that cannot be interpreted as integers". So we need to validate. How to check validity of an unsigned/signed BigInt-like string representation in TS without relying on `Number` conversion for validation? We can write a helper function or use regex `/^[-+]?[0-9]+$/`. Yes, regex is safe and precise.

Revised plan:
1. Split by comma
2. For each token, trim whitespace
3. Check if it matches ^\s*([+-]?)?[0-9]+\s*$ after trimming - actually better to use strict validation: remove leading/trailing spaces then check regex /^\d+$/ or /^-\d+$/ etc? Actually the problem says "elements that cannot be interpreted as integers" should be ignored. So we can try-catch when converting, but using BigInt constructor will throw if invalid string (e.g., non-numeric characters). Alternatively use `BigInt.parse()` which doesn't exist; instead manually validate with regex:

Valid patterns:
  - Optional +/- followed by digits only
But note that leading zeros are allowed in integer representations? Yes. So valid pattern is optional sign + one or more digits. Regex: /^(-?\d+)$/ 

Then convert using `BigInt(token)` after trimming and checking against the positive/negative digit-only pattern.

Final corrected code:
