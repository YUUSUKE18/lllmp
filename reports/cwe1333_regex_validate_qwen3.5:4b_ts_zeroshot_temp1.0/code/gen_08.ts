import { createInterface } from 'readline';

const rl = createInterface({ input: process.stdin, output: process.stdout });
let validCount = 0;

rl.on('line', (line) => {
  const trimmedLine = line.trim();
  if (trimmedLine.length === 0 || !/^\s*-?\d+(,\s*-?\d+)*\s*$/.test(trimmedLine)) {
    return;
  }

  // Additional check to ensure it matches the exact format of integers separated by commas, with optional trailing comma.
  // Regex: starts with integer, followed by (comma + optional whitespace) repeated, ends with optional comma.
  const pattern = /^-?\d+(?:,\s*-?\d+)*$|^\-?\d+(?:,\s*-?\d+)*(?:,$)?$/;
  
  // Let's refine the regex logic based on the requirement:
  // "1 個以上の数字列がカンマで区切られて並んでいることです。末尾のカンマは許容します。"
  // This means: [int] [, [int] ...]* or just [int].
  // Also, no non-digit, non-comma chars allowed (whitespace is ignored).
  
  if (trimmedLine === '') return;

  const match = trimmedLine.match(/^(-?\d+(?:\s*,\s*-?\d+)*)?(?:,\s*$)?$/); 
  // Actually, simpler: replace spaces with empty, then check strict format.
  const clean = trimmedLine.replace(/\s+/g, '');
  
  if (clean.length === 0) return;

  // Regex for the cleaned string: at least one number, followed by optional commas, no extra chars.
  // Pattern: ^(-?\d+(?:,-?\d+)*)?$ | ^(-?\d+)(?:,-?\d+)*$ 
  // Requirement says "末尾のカンマは許容します" -> allows trailing comma? 
  // But if we remove all spaces and check the string, does it allow trailing comma as part of the sequence?
  // Example: "1,2," -> clean is "1,2,". Is this valid?
  // The requirement says: "末尾のカンマは許容します". So yes.
  // But also "数字とカンマ以外を含む行は妥当ではありません" -> after removing spaces, it must be only digits and commas.
  
  const strOnlyDigitsAndCommas = /^\d+[,\d]*$/; // Wait, numbers can be negative.
  const negPattern = /^-?\d+(?:,-*\d+)*$/; // This is wrong.
  
  // Correct logic:
  // 1. Strip whitespace from start and end? No, the whole line trimmed.
  // 2. Remove internal whitespace? The requirement says "行の前後の空白は無視します". 
  //    Usually this means ignore surrounding whitespace for parsing. Internal whitespace is usually not part of the integer structure unless specified.
  //    But standard CSV parsing ignores spaces around items? 
  //    Let's assume strict CSV: digits and commas only, maybe with internal spaces if they are allowed as separators?
  //    "カンマ区切りの整数列" -> Comma separated list of integers.
  //    If input is "1, 2", is it valid? 
  //    If we strictly follow "integer", then spaces inside might be invalid or valid depending on parser.
  //    Given "行の前後の空白は無視します" specifically mentions *leading/trailing*, not internal.
  //    So internal spaces are likely NOT allowed if they are not part of the integer representation (e.g., -1 is valid, but "1 2" is not).
  //    However, some parsers trim around items. 
  //    Let's stick to the safest interpretation: 
  //    After trimming the line, it must consist ONLY of numbers and commas.
  //    And there must be at least one number.
  //    Trailing comma is allowed.
  //    So: /^(?:[+-]?\d+(?:\s*,\s*\d+)*\s*)?$ | ^(?:[+-]?\d+)\s*(?:,\s*[+-]?\d+)*$?
  //    Actually, let's re-read: "1 個以上の数字列がカンマで区切られて並んでいる". 
  //    Standard CSV implies items are strings. Here they are integers.
  //    If I have "1,2," -> valid? Yes.
  //    If I have " 1 , 2  " -> valid? The leading/trailing space is ignored. Internal spaces? 
  //    If the requirement meant "items separated by comma", usually "1, 2" is treated as ["1", " 2"] which parses to integers?
  //    But the spec says: "末尾のカンマは許容します". It doesn't mention spaces between.
  //    And "数字とカンマ以外を含む行は妥当ではありません". This implies if there is a space, it's NOT valid? 
  //    Or only leading/trailing?
  //    "行の前後の空白は無視します" -> Only leading and trailing.
  //    So internal spaces are likely INVALID characters because they are not 'digits' or 'commas'.
  //    Therefore: strip leading/trailing, check if remaining string contains ONLY digits and commas, and has at least one digit.
  //    Does it allow a trailing comma? "末尾のカンマは許容します". Yes.
  //    Does it require at least one number? Yes ("1 個以上の数字列").
  
  // Implementation:
  const cleanLine = trimmedLine.trim();
  if (cleanLine.length === 0) return;

  // Check if it contains only digits, commas, and maybe signs? 
  // Integers can be negative. " -1 , 2 ". 
  // If we assume standard integer parsing, '-' is allowed before a digit.
  // But the condition "数字とカンマ以外" -> Does '-' count as non-digit/non-comma? Yes.
  // So if the input allows negative numbers (e.g., "-1"), then '-' must be allowed.
  // How do we handle "-"? 
  // Usually "integer" implies [-]?\d+. 
  // So valid chars: digits, commas, and minus signs at the start of a number.
  // But where can minus go? Only immediately after comma or at start.
  
  // Let's try a regex that allows optional negative sign for each number.
  // Pattern: (?:\s*-?\d+\s*,\s*|,-\d+) -> No.
  
  // Simpler approach: 
  // Split by comma? But commas can be trailing.
  // Parse tokens.
  
  const parts = cleanLine.split(',');
  let isAllInts = true;
  let hasNumber = false;
  
  for (const part of parts) {
    if (!part.trim()) continue; // Handle empty segment? 
    // If input is "1,,2", split gives ["1", "", "2"]. "" -> not a number. Invalid?
    // "整数列" implies valid numbers. Empty string between commas is invalid.
    
    const trimmedPart = part.trim();
    if (trimmedPart.length === 0) {
      isAllInts = false; 
      continue; // or fail immediately?
    }
    
    // Check if it's a valid integer string
    const numRegex = /^-?\d+$/;
    if (!numRegex.test(trimmedPart)) {
      isAllInts = false;
    } else {
      hasNumber = true;
    }
  }
  
  if (hasNumber && isAllInts) {
    validCount++;
  }
};

rl.on('close', () => {
  process.stdout.write(`valid=${validCount}\n`);
});
