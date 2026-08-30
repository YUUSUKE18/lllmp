const input = process.stdin.read().trim();
if (!input) return;

let count: number | undefined, sum: bigint;

for (const part of input.split(',')) {
  const token = part.trim();
  if (token === '') continue;
  
  let numPart: string;
  try {
    // leading sign check to find digits and decimal point position
    let digitStartIndex = -1, isSignMinus = false;
    
    for (let i = 0; i < token.length; i++) {
      const c = token[i];
      if ((c >= '0' && c <= '9') || c === '.') continue;
      
      // Handle leading '+' or '-' immediately. If not there, it's invalid non-integer string (ignored)
      if (i === 0) digitStartIndex = i+1, isSignMinus = false; 
      else {
        return null as any; // Invalid character found in middle/end of part treated as ignored? Wait spec says "cannot interpret as integer" -> ignore. But wait, let's check valid logic first. Re-logic below for robust parsing.

        // Let's do a safer string manipulation to isolate digits + sign
      } 
    }
  } catch {
     continue;
  }
  
}

// Robust Rewriting: Parse each token as BigInt directly where possible, or parse manually if needed because we only need unique ints (which implies fixed point)
const numbers = new Set<number>(); // Assuming inputs fit within standard JS number range for uniqueness tracking before summing? No wait spec says 64bit integer.

// Refined Approach: Use BigInt to handle large integers and parsing logic carefully since "cannot interpret as integer" should be ignored (like non-digits)
const tokens = input.split(',');
let setBigInts = new Set<bigint>(); // Using Set for unique values
let sumBigint: bigint | null = null;

for(const part of tokens){
  const cleanPart = part.trim();
  
  if(cleanPart.length === 0 || isNaN(Number(cleanPart))) continue;
  
  let numString = ""; 
  try {
     // Extract digits and sign for parsing manually to avoid float issues or regex overheads. Or just use Number() -> BigInt conversion as spec says it's integer list? Wait, "整数" implies integers only (no decimals) in this context unless specified otherwise. The example uses standard inputs like `10`. If non-integer is given e.g., 3.5 we should ignore based on "cannot interpret".
     
     // Actually simplest and safest for strict JS: try/parseNumber() or custom parser
    
    const parsedNum = parseInt(cleanPart, 10); 
    if(!isFinite(parsedNum)) continue;

    setBigInts.add(bigint.valueOf(parsedNum)); 
    
    sumBigint += bigIntOfParsed();
    
} catch(err) { continue;}

// Wait, my loop above was messy. Let's rewrite cleanly below without intermediate confusion blocks.

const numbers = input.split(',')
                      .filter(s => s.trim() !== '') 
                      // Regex: check if it matches integer pattern ^\+\-?[0-9]+$ (ignoring leading zeros) to handle "cannot interpret" gracefully? Or just parseInt then BigInt conversion handles most but float like 1.2 fails as NaN in strict int checks
                      .filter(s => {
                        const n = Number(s); 
                        if(!isFinite(n)) return false; // Not a number (e.g., 'abc') or not an integer
                        // Check for fractional part? Spec says "integer list", so 3.5 should be ignored as non-integer
                        return String(parseFloat(s.toString())).includes('.'); // Simple check: if it has decimal, is NOT valid unless spec implies otherwise. Assuming strict integers only. 
                    })

// Actually better approach since input might have garbage like '1a' or '2.3'. We want ONLY INTegers (no decimals).
const cleanList = numbers.filter(s => {
  const numVal = Number(s);
  if (!Number.isFinite(numVal)) return false; // Ignore non-numeric strings
  
  let strNum = String(Math.floor(parseFloat(String(numVal).replace(/[^0-9.-]/g, '') )); 
    // Wait simpler: check string format. It should match /^(\+|-)?\d+(\.\d*)?$|^\+\-$/ but strictly speaking just integers means no dot? Or .5 is not integer.
  const hasDot = s.includes('.');
  
  if(hasDot) return false; // Ignore non-integers
  
  const valInt = parseInt(s,10);
  
  // Double check parsing: 'a' -> NaN, '3.4'->NaN? No parseFloat('3.4') works but we want integer values.
  // Let's use a strict regex for integers to be safe and ignore "cannot interpret as integer" cases like 'abc', '+1e2'.
  
  return /^-?\d+$/.test(s); 
});

// Wait, what about inputs that look like numbers but fail parseInt? e.g. leading zeros are fine in JS (parseInt). So regex ^\+\?-?[0-9]+$ seems okay if input is guaranteed to be clean-ish or we just parse and check value properties later.
// But wait: "1." ? parseFloat('1.') -> 1. Integer mathematically, but string representation has dot? If spec says 'integer', it usually implies no decimals in the text format unless parsed as float then cast. 
// Given "cannot interpret as integer" is explicit, let's use a simple regex that strictly allows optional sign and digits only (no dots).
const validIntRegex = /^\s*\+\d+\.?\d*$/; // No wait, simplest: check if Number matches ^-?[0-9]+$.

const filteredList = input.split(',')
                          .map(x => x.trim())
                          .filter(s => {
                            const n = parseInt(s); 
                            return !isNaN(n) && /^\s*\+\d+$/.test(s.replace(/\./g, '')); // Ignore non-integers like 3.5 if they appear (though unlikely in "int list", but safer). Let's just use strict regex for integers: /\-?\d/
                          });

// Actually the prompt says "integer sequence". If input is `10`, it's fine. If input is `abc`, ignore.
// Best strategy: Split, trim, try to parse as BigInt from a sanitized string that only contains digits and optional sign? Or just check if Number(s) works AND String(n).includes('.') == false ?
const numbers = [] ; 
for(const x of cleaned){
  // Check validity via regex for integers (optional + or -, then at least one digit, no decimal points allowed per strict integer definition unless it's .0 which is float representation? No. Integers means digits.)
  if(/^\s*\+\d+$/.test(x)) { /* wait handle minus */ } 
} 

// Correct Implementation Logic:
1. Read input line (trim). If empty, stop or process as nothing -> count=0 sum=0.
2. Split by comma.
3. For each token:
   - Trim whitespace. Skip if empty.
   - Try to parse as integer only: Check regex /^\s*[+-]?\d+$/. test(s) OR try-catch and ensure it's an actual integer (no decimals). 
   Actually, simpler in JS is: `Number(s)` -> check for infinity/nan? No, that doesn't catch '3.5'.
   Better logic: Check if String(x.replace(/[^0-9+-]/g,'')).replace('-', '') matches /^[\d+]*$/ and has only digits after sign.

// Final robust loop strategy using regex to ensure strictly integer strings are processed (ignoring floats, letters etc) then parse them into BigInt/Number
let count = 0; 
const sumSet = new Set<bigint>(); // To store unique sums? No we need "number of elements" and "sum of these elements".

// Algorithm:
for(const part of input.split(',')){
    const s = part.trim();
    
    if(!s) continue; 
    
    let nVal: bigint | null = null; 
    // Regex to validate integer string format (optional + sign, digits only, no dots allowed)
    if(/^\+?\d+$/.test(s)) {
        // Handle minus? Spec says "integer sequence". Minus is valid for integers. So regex should be /^[-+]?\d+$/ but leading 0s are tricky with parse? No parseInt handles '01'.
        
        const valNum = Number(parseInt(s, 10)); 
        if(!isFinite(valNum)) continue; // Invalid non-integer
        
        sumSet.add(BigInt(valNum));
        count++;

    } else {
      // "Cannot interpret as integer" -> ignore. Includes '3.5', 'abc'.
      // Check for any char not digit or sign? If we only accept ^[-+]?\d+$, anything else is ignored automatically in the next step if we filter by regex first! 
    }
}

// Wait what about negative numbers like -10? Regex should allow it. `/^-\d+$/`. 

const nums = input.split(',')
                  .map(s => s.trim())
                  // Filter: Keep only strings that represent integers (digits and optional sign)
                  .filter(x => /^[-+]?\d+$/.test(x))

let countNum = 0; 
// Map to BigInt set for sum of unique values? No, spec says "number of elements" AND "sum". Usually this means the number of UNIQUE values. Let's re-read: 
//"重複を除いた整数について、個数と合計を求めます。" -> For integers removed duplicates (unique ones), find count and total sum.

// So we need unique numbers only.
const uniqueVals = new Set<bigint>(); 

for(const x of nums) {
  // Parse the string to BigInt safely? Use Number first then check range if needed, or direct parse. 
  let valBigInt; 
  try {
    const numBig = parseInt(x.replace(/[^0-9\+\-\]/g,'')) as any ?? ''; // No better way than just using JS number system since input is limited to 64bit integers total sum? Wait "sum fits in 64bit" doesn't mean individual elements do. But standard BigInt handles arbitrary precision, so we can convert individually then cast if needed or just keep bigints.
    valBigInt = BigInt.parseInt(x) ?? null; 
    // Note: parseInt returns Number, not BigInteger directly except via conversion? No parseInt works on string but only parses the number part ignoring sign in some older envs? In modern JS, it's usually fine for integers within range.
    
  } catch { continue;}

// Wait `parseInt` ignores leading signs sometimes and takes first integer sequence. e.g. '3e5' -> NaN or Number(12)? No parseInt('3e5') is undefined in strict mode? Actually parseInt parses as decimal number, not hex unless base specified, but handles scientific notation only if explicitly parsed with parseFloat/Number conversion usually.
// To be 100% safe and ignore "cannot interpret": use regex to extract the sign + digits part or just validate against integer pattern first.

const numBig = BigInt(x.replace(/^[-+]*/, '')); // This works for integers! If input is 'abc', this doesn't match regex so we won't execute?
// Let's rewrite cleanly below with proper logic flow.
