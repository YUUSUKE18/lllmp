```ts
import * as readline from 'readline';

const rl = readline.createInterface({ input: process.stdin });

rl.on('line', (line) => {
  if (!line.trim()) return;
  
  const target = parseInt(line, 10);
  if (isNaN(target)) return;

  const numbers = [];
  for (let i = 2; i < line.length && line[i] !== '\n'; i++) {} // This logic is flawed for reading subsequent lines. Let's use a proper approach.

  // Re-implementing the core loop to read all input properly before processing
  rl.on('line', async (line) => {
    if (!line.trim()) return;
    
    let targetVal: number | null = null;
    let dataLinesRead = false;
    let count = 0;

    // We need to handle the first line as target, then all subsequent lines as numbers.
    // Since readline emits one line at a time, we can't easily wait for "all input" 
    // unless we assume the program runs until EOF or we store state across 'line' events.
    
    // Better approach: Store target when available, then collect numbers until process exits.
    // However, the spec says "1 row on standard input has the target value".
    // This implies the first line is the target, and following lines are numbers.
    // We can accumulate numbers from all 'line' events after detecting the target.
    
    // Let's reset logic to be simpler and robust.
    // We'll collect all valid integers into an array once we have the target.
  });

  // Wait, readline is synchronous in the sense that we handle lines one by one.
  // If the first line is missing (e.g. empty file), we should not output.
  
  // Correct Flow:
  // 1. Listen for lines indefinitely.
  // 2. Maintain a state machine or flag to know if target is found.
  // 3. Once target is found, parse subsequent lines into an array of integers.
  // 4. Filter out empty/invalid lines? Spec says "ignore blank lines and lines that cannot be interpreted as integers".
  
  // Let's rewrite inside the handler properly.
});

// Let's use a closure or global state to track progress across 'line' events.
// We need variables accessible within the scope of readline.

let targetVal: number | null = null;
const nums: number[] = [];

rl.on('line', (line) => {
  // Skip empty lines
  if (!line.trim()) return;

  const parsed = parseInt(line, 10);
  
  // If this is the first line and it parses as an integer, treat it as target?
  // The spec says "The 1st line contains the target value".
  // So the very first non-empty line is the target.
  
  if (targetVal === null) {
    const val = parseInt(line.trim(), 10);
    if (!isNaN(val)) {
      targetVal = val;
      nums.push(val); // Actually, the spec says "2nd row and following have integers".
                      // It implies the FIRST non-empty line is target.
                      // But wait, does the first line count towards the pairs?
                      // Usually, target lines don't contain numbers to be paired.
                      // The spec: "2nd line onwards... among the integers from 2nd line onwards".
                      // So if line 1 is target, and we read it as an integer, should we exclude it?
                      // Yes, "2 行目以降" means starting from index 1 (0-based) or second row.
                      // If line 1 is the target, then numbers are in line 2, 3, ...
                      
      // However, my current logic processes every line as data until I know it's the target.
      // Let's restructure:
      // Line 1 (non-empty) -> Target.
      // Subsequent lines -> Numbers.
      
      // But if there are blank lines before the target? "Standard input 1st row has target".
      // Usually means line 1 is target. Blank lines at start might be ignored per spec?
      // Spec: "Blank lines are ignored". So we skip blanks until we find target.
      
      // Revised Logic:
      if (!targetVal && parsed >= targetMin?) { No min specified, just valid integer }
      
      // Actually, let's just collect all numbers first? No, stdin is a stream.
      // We must detect the break point: Target Line -> Data Lines.
      
      // Let's assume the input format is strict:
      // Line 1: Target
      // Line 2..N: Numbers
      // But with potential blank lines interspersed which are ignored.
      
      // Strategy:
      // If targetVal is null, and we parsed a number -> this might be the target.
      // BUT if there were blank lines before? 
      // Spec: "Blank lines are ignored". So effectively, the first non-blank line is target.
      
      // Let's store numbers in an array ONLY after confirming targetVal exists?
      // Or simpler: Read all input into a buffer first? No, Node.js stream might be large.
      // But since we need to find pairs, we can process online if we knew the target immediately.
      // We don't know subsequent lines until they come.
      
      // Okay, let's use an array `numbers` and append to it whenever we are in "reading numbers" mode.
      // When do we switch from "looking for target" to "reading numbers"?
      // When the first non-blank line is encountered -> that IS the target.
      // Then EVERY subsequent non-blank line with a valid integer is added to `numbers`.
      
      if (targetVal === null) {
        // This is likely the target line.
        targetVal = parsed;
        nums.clear();
      } else {
        // We are in data mode. Add number.
        nums.push(parsed);
      }
    }
  }

  // Wait, I need to handle the logic correctly inside a single file without external packages.
  // The previous snippet had syntax errors and incomplete logic.
  // Let's restart the code structure cleanly in one block.
  
  if (targetVal === null) {
     // First valid integer line encountered -> Target
     targetVal = parseInt(line, 10);
     nums.length = 0; // Reset for safety
  } else {
    nums.push(parseInt(line, 10));
  }
});

// Wait, I cannot do `if` inside a loop like that if the logic is messy.
// Let's write the full code clearly.

// State:
// targetVal: null or number
// nums: number[]

rl.on('line', (line) => {
  // Ignore empty lines always? 
  // "Blank lines are ignored". Yes.
  if (!line.trim()) return;

  const val = parseInt(line, 10);
  
  // Check if valid integer
  if (isNaN(val)) return;

  if (targetVal === null) {
    // This is the target line (first non-blank line)
    targetVal = val;
    // Do not push to nums yet, because pairs are from 2nd row onwards.
    // The target itself is NOT part of the numbers set.
  } else {
    nums.push(val);
  }
});

rl.on('close', () => {
  if (targetVal === null || nums.length === 0) return;

  // Find pairs
  let count = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === targetVal) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});

// However, there is a catch: The problem says "2nd row and following".
// If the first line has garbage text? No, "Standard input's 1st row contains target value".
// So the first line MUST be the target.
// My logic assumes the first valid integer found is the target.
// What if there are blank lines before the target?
// Spec: "Blank lines are ignored". So skipping blanks until we hit a number -> that is the target.
// This seems correct.

// Wait, what if the target line itself has spaces around it? parseInt handles that.
// What if the input has no numbers after target? nums.length will be 0.
// The loop won't run, count=0. Correct.

// Double check: "2nd row and following... among them".
// If input is:
// 10
// 2
// 8
// Line 1: 10 (Target)
// Line 2: 2 (Num)
// Line 3: 8 (Num)
// Pairs: 2+8=10. Count=1.

// Another case:
//   10  
//   
// 2
//   
// 8
// Line 1: 10 (Target) -> Ignored blank lines before? 
// Spec says "Blank lines are ignored". 
// If there is a blank line before the first row, do we consider it empty?
// "Standard input's 1st row has target value".
// This phrasing suggests Line 1 of the file is the target.
// But if Line 1 is empty, does it count as "1st row has target"? No.
// It's safer to ignore blank lines until we find the target.
// Because "Blank lines are ignored" applies globally or to interpretation?
// Usually in such problems, you skip empty lines to find data.

// Let's refine the logic to strictly follow:
// 1. Skip empty lines (lines that have no non-whitespace chars).
// 2. The first line with a valid integer is the target.
// 3. All subsequent lines with valid integers are candidates for pairing.

// Code Structure:
import * as readline from 'readline';

const rl = readline.createInterface({ input: process.stdin });

let targetVal: number | null = null;
const nums: number[] = [];

rl.on('line', (line) => {
  if (!line.trim()) return; // Skip blank lines

  const val = parseInt(line, 10);
  if (isNaN(val)) return; // Ignore unparseable lines

  if (targetVal === null) {
    targetVal = val;
    nums.length = 0; // Ensure clean slate
  } else {
    nums.push(val);
  }
});

rl.on('close', () => {
  if (targetVal === null || nums.length < 2) {
    console.log('pairs=0');
  } else {
    let count = 0;
    for (let i = 0; i < nums.length - 1; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        if (nums[i] + nums[j] === targetVal) {
          count++;
        }
      }
    }
    console.log(`pairs=${count}`);
  }
});

// Wait, the spec says "2nd row and following".
// If the input is literally:
// Line 1: Target
// Line 2: Number
// My logic treats Line 1 as target. Correct.
// But what if there are blank lines before line 1?
// If I skip blanks, and find a number, is that necessarily the target?
// The spec says "Standard input's 1st row has target value".
// This implies strict positional mapping: Row 1 = Target.
// However, if Row 1 is blank (violating the spec slightly or testing robustness), skipping blanks makes sense for "ignoring blank lines".
// Given "Blank lines are ignored", it's safe to assume we skip until we see a number, then that first number is target.

// Final check on output format: `pairs=<number>` followed by newline.
// Done via console.log.

// One edge case: Large numbers (64bit). Node.js Number handles 64-bit integers accurately for addition and comparison within safe integer range?
// JavaScript uses 64-bit floats (Double Precision IEEE 754), which has a maximum safe integer of 2^53 - 1.
// The spec says "Value and count fit in 64-bit integer".
// If values > 2^53, precision loss might occur in addition or comparison.
// However, typical competitive programming constraints often imply they fit in 64-bit signed integer, but JS Number loses precision above 9e15.
// To be safe against large integers (up to 9e18), we should use BigInt?
// The spec says "fits in 64bit integer". In many contexts, this means the mathematical values are within [-2^63, 2^63-1].
// JavaScript's Number type can represent integers up to 2^53 exactly. Beyond that, it becomes a float.
// If the inputs are truly up to 2^63, we CANNOT use Number for exact addition without precision loss unless they happen to be within safe range.
// Does "fits in 64bit integer" imply we must handle arbitrarily large integers (BigInt)?
// Usually, yes, if the values can exceed 2^53.
// Let's use BigInt to be absolutely safe and correct per spec "64bit integer".

// Refined Code with BigInt:

import * as readline from 'readline';

const rl = readline.createInterface({ input: process.stdin });

let targetVal: bigint | null = null;
const nums: bigint[] = [];

rl.on('line', (line) => {
  if (!line.trim()) return; // Skip blank lines

  const valStr = line.trim();
  const valStrClean = valStr.replace(/[^0-9\n\r]/g, ''); // Remove any non-digit chars except newlines? 
  // parseInt in Node.js for JS Number. For BigInt, we need manual parsing or just use String methods.
  // Let's assume input contains only digits. If there are signs (+/-), parse accordingly.
  
  // Robust parsing for BigInt:
  const start = 0;
  let end = valStr.length;
  while (start < end && !isNaN(valStr.charCodeAt(start) - 32)) { skip whitespace } ...
  // Simpler: use parseInt with base 10, but it returns Number.
  // We need to convert to BigInt.
  
  const num = BigInt(parseInt(valStr.replace(/[^0-9+\-]/g, ''), 10) || "0"); // Still risky for large numbers? 
  // No, parseInt converts string to Number (64-bit float). If the string represents a number > 2^53, it truncates.
  // Example: BigInt("9007199254740993") vs BigInt(Number("9007199254740993")).
  // The latter will lose precision if the input was larger than 2^53 but still within 64-bit range (e.g. 2^60).
  // We must parse manually or use a library? No external packages allowed.
  // Manual parsing is required for BigInt safety with large inputs.

  const cleanVal = valStr.replace(/\s/g, ''); // Remove spaces
  
  if (cleanVal.length === 0 || cleanVal === '+') { continue; }
  
  let sign = 1n;
  let idx = 0;
  if (cleanVal[0] === '-') {
    sign = -1n;
    idx = 1;
  } else if (cleanVal[0] === '+') {
    idx = 1;
  }
  
  const strAbs = cleanVal.substring(idx);
  let val: bigint = 0n;
  for (let i = 0; i < strAbs.length; i++) {
    val = val * 10n + BigInt(strAbs.charCodeAt(i) - 48);
  }
  const result = sign * val;

  if (targetVal === null) {
    targetVal = result;
    nums.length = 0; // Reset for safety (though we shouldn't have numbers before target)
  } else {
    nums.push(result);
  }
});

rl.on('close', () => {
  if (targetVal === null || nums.length < 2) {
    console.log('pairs=0');
  } else {
    let count = 0;
    // Use BigInt for comparison
    for (let i = 0; i < nums.length - 1n; i++) { // Note: length is number, not bigint here. 
      for (let j = i + 1n; j < nums.length; j++) {
        if ((nums[i]!+nums[j]) === targetVal) {
          count++;
        }
      }
    }
    console.log(`pairs=${count}`);
