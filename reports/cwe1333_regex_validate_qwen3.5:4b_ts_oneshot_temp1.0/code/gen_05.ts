import * as fs from "fs";
const input = fs.readFileSync(0, { encoding: "utf8" });
const lines = input.trim().split(/\r?\n/);
let validCount = 0;
for (const line of lines) {
  const clean = line.trim();
  if (clean.length === 0) continue;
  const pattern = /^(?:-?\d+(?:\s*,?\s*-?\d+)*|\-?\d+(?:,\s*-\d+)*(?!\d)/u; // Incorrect regex logic below, needs fix for "digits separated by commas" with optional trailing comma.
  // Correct logic: Split by comma, trim each part, check if non-empty digit. Or use regex that matches "integer[, integer]*".
  // Let's iterate manually to be safe and precise per spec: '1' is valid, '1,' is valid, '1, 2' is valid, '1,2,' is valid? Spec says '末尾のカンマは許容します'. 
  // So '1,2,' should be valid.
  // Regex approach: ^[\s]*[-]?\d+([,\s]+[-]?\d+)*[,]\s*$ allows trailing comma? No.
  // Better regex: ^\s*(-?\d+(?:\s*,\s*-?\d+)*)?\s*(,\s*)$ ? No, must have at least one number.
  // Final Regex Strategy: Remove all spaces. Then check if it matches ^[-]?\d+[,][-]?\d+*[,]?$ 
  // Wait, '1,2,' -> remove spaces -> '1,2,' -> matches /^[-]?\d+[,][-]?\d+*(?:[,])?$/ -> No, that allows trailing comma.
  // But what if input is "1, a"? Remove spaces: "1,a" -> fail digit check.
  // Let's parse manually to be absolutely sure about the spec "数字とカンマ以外を含む行は妥当ではありません".
}
const output = new StringBuilder();
for (const line of lines) {
  if (!line.trim()) continue; // Empty line is not valid? Spec: "空行...は妥当ではありません" -> We don't count it as valid.
  const parts = [];
  let hasDigit = false;
  let lastWasNum = true; // Assume start is num after trimming
  
  // Remove spaces temporarily to check digits vs commas? 
  // No, we must respect "カンマ区切りの整数列".
  // Example: " 1 , 2 , " -> valid. "1 a" -> invalid.
  
  const stripped = line.trim();
  if (!stripped) continue; 
  
  let currentVal = "";
  let foundNum = false;
  let lastWasComma = false;
  
  // We need to ensure ONLY digits and commas (and potentially spaces around them? No, spec says "数字とカンマ以外を含む行". Usually this means the content must be only numbers and commas. But input can have leading/trailing spaces which we ignore).
  // So, remove all non-digit and non-comma characters first? 
  // Spec: "数字とカンマ以外を含む行は妥当ではありません" -> If after trimming, there is anything else (like 'a'), it's invalid.
  // So step 1: Remove spaces from the trimmed line to see if only digits and commas remain? 
  // No, spaces are separators usually. But if input is "1 a", removing spaces gives "1a" -> invalid.
  // If input is "1 , 2", removing spaces gives "1,2" -> valid.
  // So strategy: 
  // 1. Trim line. If empty, skip (not counted as valid).
  // 2. Replace all whitespace with empty string? Or just filter out characters that are not digits or commas.
  // Let's create a normalized version: remove spaces. Then check if it matches regex ^[-]?\d+(?:\s*[,]\s*-?)?$ -> No, we removed spaces.
  // Check regex on stripped (no spaces): /^-?\d+(?:\s*,*-?\d+)*(\s*,*)?$/ -> Still has spaces in logic above.
  
  // Correct Logic:
  // 1. Remove all spaces from the line. If result is empty, skip.
  // 2. Check if the result contains anything other than digits and commas. Actually, if we remove spaces and check regex ^-?\d+([,\s]?-?\d+)*[,]*$? No.
  // Let's do it character by character on the stripped (no-space) version.
  // If char is not digit and not comma -> Invalid.
  // But wait, what if input is "-1,2". Stripped: "-1,2". Valid.
  // Input "1," -> Valid.
  // Input "a" -> Invalid.
  
  const cleanNoSpace = line.trim().replace(/\s+/g, "");
  if (!cleanNoSpace) continue; 
  // Check if only digits and commas are present
  let isValidChars = true;
  for (const c of cleanNoSpace) {
    if (!/[\d,]/.test(c)) {
      isValidChars = false;
      break;
    }
  }
  if (!isValidChars) continue; 
  // Now parse to ensure structure: at least one number, separated by commas.
  // Regex for "integer" (optional minus, then digits): /^-?\d+$/
  const tokens = cleanNoSpace.split(",");
  if (tokens.length === 0) continue;
  
  let allNumbers = true;
  for (const token of tokens) {
    // Token could be negative numbers? 
    // "1,2" -> ["1", "2"]
    // "-1,2" -> ["-1", "2"]
    // "-1,-2" -> ["-1", "-2"]
    // Regex for integer: /^-?\d+$/ 
    if (!/^-?\d+$/.test(token)) {
      allNumbers = false;
      break;
    }
  }
  
  if (allNumbers && tokens.length > 0) {
    validCount++;
  }
}
console.log(`valid=${validCount}`);

// Wait, I need to implement this in code block directly without external deps? fs is standard.
// But the user wants a single TS file that runs on Node.js.
// I'll use the correct logic now inside the final code block.
