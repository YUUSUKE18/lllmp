import { createRequire } from 'module';
const require = createRequire(import.meta.url);
// Note: While the requirement says no external packages, standard library Node.js functions like createRequire are implicitly available. 
// However, to strictly follow "no external packages" and avoid import complexity for regex in pure runtime, 
// we can use the built-in 'util' or just standard typescript without imports if possible.
// But actually, regex doesn't need any imports. Let's stick to the core logic without unnecessary imports if possible,
// but process.stdin handling is native. The only potential 'package' issue is if I used something like readline from a package, 
// which isn't needed as we can use process.stdin on Linux/Node.js directly for line reading or just read().

// Re-reading the requirement: "No external packages".
// Standard library functions are fine. But to be 100% safe and clean without any 'require' hacks if not needed:
// We can use process.stdin on Node.js environments which is standard.

const fs = require('fs'); // This is a built-in module, so it counts as "no external packages".

let input: string[] = [];

try {
  input = fs.readFileSync(0, 'utf8').split('\n').filter(line => line !== '');
} catch (e) {
  console.log('valid=0\n');
  process.exit(0);
}

const regexValid = /^\s*(\d+(?:,\d+)*)?\s*$/;
const regexInvalidChars = /[^\d,]/; // Check if there is anything other than digit or comma (and whitespace which is ignored before/after)

// Wait, the spec says: "数字とカンマ以外を含む行は妥当ではありません" (Lines containing characters other than numbers and commas are not valid).
// But it also says: "行の前後の空白は無視します" (Leading/trailing whitespace is ignored).
// So the core content must only be digits and commas.

let validCount = 0;

for (const line of input) {
  // Remove leading/trailing whitespace
  const trimmed = line.trim();
  
  // If empty after trim, it's invalid (must contain at least one number)
  if (trimmed === '') {
    continue; 
  }
  
  // Check for invalid characters (anything not digit or comma)
  let hasInvalidChar = false;
  for (const char of trimmed) {
    if (!/[0-9,]/.test(char)) {
      hasInvalidChar = true;
      break;
    }
  }
  
  if (hasInvalidChar) {
    continue; // Not valid
  }
  
  // Check if it matches the pattern: one or more numbers separated by commas, optionally trailing comma.
  // Example: "1", "1,2", "1," are valid.
  // "1,2," is valid.
  // The logic: Split by comma? No, check regex directly on trimmed string.
  // Pattern: (\d+(?:,\d+)*)+  -> One or more groups of (digits followed by optional comma and more digits)
  
  const regex = /^(\d+(?:,\d+)*)+$/;
  if (regex.test(trimmed)) {
    validCount++;
  }
}

console.log(`valid=${validCount}\n`);
