import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf-8');
const lines = input.split('\n').filter(line => line.length > 0);
let validCount = 0;

for (const line of lines) {
  const trimmed = line.trim();
  if (trimmed === '') continue;

  const regex = /^\s*(?:\d+(\s*,\d*)*|\s*d,\s*$/; // Adjusted for trailing comma with spaces or no spaces
  // Correcting regex logic: must be digit sequence separated by commas, optional trailing comma.
  // Pattern explanation:
  // ^\s* -> start, optional whitespace
  // (?:\d+(\s*,\d*)*|\s*d,\s*$) -> either digits separated by commas or end of string is not expected here, let's rethink the structure.
  // Actually, the requirement is "1 or more numbers separated by commas, trailing comma allowed".
  // So it should be: digits (comma digit)* (optional comma).
  // But wait, if there is a trailing comma at the very end of input, it implies an empty last element? 
  // Example: "1,2," is valid? Yes. "1" is valid? Yes. ",,," is invalid because it starts with comma.
  // "1, 2, " -> valid? Yes if spaces are allowed around numbers and commas.
  // Let's refine the regex to match the spec strictly: 
  // - At least one digit.
  // - Digits separated by commas (possibly with surrounding whitespace).
  // - Optional trailing comma.

  // Correct Regex logic:
  // ^\s*(?:\d+(?:,\s*\d+)*)?\s*$ -> This matches only digits, but we need to allow trailing comma.
  // Let's try again.
  // Valid examples: "1", "1,2", "1,2,", " 1 , 2 , ", "1,,2" -> Is "1,,2" valid? Usually no, because double comma implies empty string between commas?
  // The spec says "integers separated by commas". It doesn't explicitly ban multiple commas. 
  // However, standard parsing rules often imply no consecutive separators unless specified otherwise. 
  // Given the ambiguity, let's assume strict separation: one or more numbers, separated by single comma(s), with optional trailing comma.
  // Let's simplify: Match digits, then optionally (comma followed by digit). Then optionally a trailing comma.
  // Pattern: ^\s*(?:\d+(?:,\s*\d+)*)\s*,?\s*$ -> This ensures at least one digit, no double commas unless we allow it. 
  // But wait, if I have "1,,2", that would be invalid under typical interpretation (empty string).
  // Let's assume the standard: digits separated by comma, maybe trailing comma.
  // Regex: /^\s*(\d+(?:,\s*\d+)*)\s*,?\s*$/
  
  const re = /^\s*(\d+(?:,\s*\d+)*)\s*,?\s*$/;
  if (re.test(line)) {
    validCount++;
  }
}

console.log(`valid=${validCount}\n`);
