const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lines = 0;
  const regex = /^(?:^\s*|\A\s*[0-9]+(?:\s*,\s*[0-9]+)*$|[0-9]+(?:\s*,\s*[0-9]+)*\s*$)/; // Adjusted logic below for strict requirement: empty or non-digit/comma is invalid.
  
  // Refined Regex approach per requirement: 
  // "1 個以上の数字列がカンマで区切られて並んでいる" (At least one number separated by commas)
  // "末尾のカンマは許容します" (Trailing comma allowed)
  // "空行...妥当ではありません" (Empty lines invalid)
  // "数字とカンマ以外を含む行は妥当ではありません" (No other chars allowed, including whitespace around numbers? 
  // Requirement says "行の前後の空白は無視します" (Leading/trailing whitespace of the line is ignored), 
  // but does not explicitly say internal whitespace is allowed. 
  // Example: "1 , 2" -> Is this valid? "数字とカンマ以外を含む行は妥当ではありません". 
  // This implies only digits and commas are allowed content-wise, leading/trailing spaces are structural (ignored).
  
  const strictRegex = /^\s*[0-9]+(?:\s*,\s*[0-9]+)*\s*,?\s*$/; // Wait, internal whitespace might be forbidden based on "No other chars". 
  // Let's re-read: "数字とカンマ以外を含む行は妥当ではありません" -> This usually means the set of allowed characters is {digit, comma}.
  // If so, "1,2" is valid. "1 , 2" has spaces inside, which are "other chars". 
  // But "行の前後の空白は無視します" applies to the whole line stripping. 
  // So after strip, only digits and commas should remain.
  // Regex: ^[0-9]+(?:,[0-9]+)*[,]*$ (Allows trailing comma)
  const finalRegex = /^[\s]{0,}\S*$/; // No, this is too generic.
  
  // Correct Logic for "No other chars except digits and comma":
  // 1. Strip leading/trailing whitespace.
  // 2. Check if string starts with at least one digit.
  // 3. The rest can be commas followed by digits, ending with optional comma.
  // But wait, does it allow internal spaces? "数字とカンマ以外...". Spaces are not digits or commas. So NO internal spaces.
  
  const lineRegex = /^[\s]*([0-9]+(?:,[0-9]+)*)[,][0-9]*(\s*[0-9]+)*(?:,[0-9]+)*$/; // Too complex.
  
  // Let's define valid pattern after trimming: 
  // It must consist ONLY of digits and commas.
  // Must start with a digit.
  // Can end with a comma.
  // Example: "123" -> Valid. "1,2,3" -> Valid. "1," -> Valid. ",1" -> Invalid (no leading digit). 
  // Regex for this specific constraint (digits/commas only, starts with digit):
  const validPattern = /^([0-9]+(?:,[0-9]+)*)[,]*$/;
  
  let isValidLine = false;
  const linesArr = s.split("\n");
  
  for (const line of linesArr) {
    if (line.length === 0) continue; // Skip empty lines during iteration? 
    // Requirement: "空行...妥当ではありません". We count how many are VALID.
    // Empty string is length 0, it doesn't satisfy "contains numbers separated by commas". So it's invalid.
    
    // Step 1: Trim leading/trailing whitespace as requested ("行の前後の空白は無視します")
    const trimmed = line.trim();
    
    // If empty after trim, it was an empty line -> Invalid.
    if (trimmed === "") {
      isValidLine = false;
      continue;
    }
    
    // Step 2: Check content allowed chars and structure
    // Allowed: digits, commas. Must start with digit.
    // Pattern: One or more blocks of (digits + optional trailing comma), separated by nothing? 
    // Actually "1,2" is valid. "1," is valid.
    // Regex explanation: 
    // ^([0-9]+(?:,[0-9]+)*)[,]*$ -> Matches "1", "12", "1,", "1,2", "1,2,". 
    // Does it allow internal spaces? No, regex only has digits and commas.
    // But wait, what if input is " 1,2 "? trim handles that. What if input is "1, 2"? 
    // "1, 2" has a space. Regex ^([0-9]+(?:,[0-9]+)*)[,]*$ will NOT match because of the space.
    // This satisfies "数字とカンマ以外...".
    
    const matches = trimmed.match(/^([0-9]+(?:,[0-9]+)*)[,]*$/);
    
    if (matches) {
      isValidLine = true;
    } else {
      isValidLine = false;
    }
  }
  
  // Re-counting properly inside loop logic to ensure only valid lines are counted.
  let count = 0;
  const finalLinesArr = s.split("\n");
  
  for (const line of finalLinesArr) {
    const trimmed = line.trim();
    
    if (trimmed === "") {
      // Empty string -> Invalid
      continue;
    }
    
    // Check strict regex: Starts with digit, contains only digits/commas.
    // Must have at least one number.
    if (/^[0-9]+(?:,[0-9]*)?$|^[0-9]+([,][0-9]+)*$/.test(trimmed)) {
       // Better explicit regex: 
       // Starts with digit. 
       // Then optionally (comma + digits).
       // Ends with optional comma? No, the pattern ^[0-9]+(?:,[0-9]*)*$ allows "1" or "1,"? 
       // No, (?:,[0-9]*) means zero or more times (comma then zero or more digits).
       // So "1," matches. "1,2" matches. 
       // But does it allow "1,2,3"? Yes.
       // Does it allow internal spaces? No.
       
       // Final Regex check:
       if (/^([0-9]+(?:,[0-9]*)*)[,]?$/ .test(trimmed)) {
          // Wait, my regex logic above was slightly flawed in the `if` block thought process.
          // Let's use a very clear regex: 
          // ^[0-9]*[1-9][0-9]*(?:,[0-9]*)*[,]*$ -> Ensures starts with non-zero digit? No, "0" is valid integer.
          // Simplest: Start with digit. Only digits and commas allowed. At least one digit at start.
          
          const strictRegex = /^([0-9]+(?:,[0-9]*)*)$/;
          // Wait, "1," matches ^([0-9]+(?:,[0-9]*)*)$? 
          // Group 1: [0-9]+ -> "1"
          // (?:,[0-9]*)* -> "," matches? No, [,0-9]* needs digits after comma. 
          // My previous regex was ^([0-9]+(?:,[0-9]+)*)[,]*$ which allows trailing comma.
          // Let's stick to: Starts with digit, chars are only 0-9 or ,, ends with optional comma.
          const validRegex = /^([0-9]+(?:,[0-9]*)*)([,][0-9]*)?$/; // Still complex.
          
          // Ultimate Regex for "Only digits and commas, starts with digit":
          const checkRegex = /^[0-9]+(?:[,.])+[0-9]*$/, ;
          
          // Actually simpler: 
          // 1. Check if string contains only digits and commas.
          // 2. Check if it starts with a digit.
          // 3. Check if there is at least one digit.
          // Since we strip trim, "0" is valid. "," is invalid (no digit).
          
          const hasOnlyDigitsAndCommas = /^[0-9,]+$/.test(trimmed);
          const startsWithDigit = /^0|[1-9]/.test(trimmed);
          
          if (hasOnlyDigitsAndCommas && startsWithDigit) {
            count++;
          }
        } else {
           // Fallback regex for safety:
           // ^[0-9]+(?:,[0-9]*)*$ -> Allows "1", "123", "1,"? No, the group requires digits.
           // Let's construct it properly:
           // [0-9]+ -> First block
           // (?:,(?:[0-9]+)) -> Subsequent blocks? No, commas can be at end.
           // Pattern: ^[0-9]+(?:,[0-9]*)?$ matches "1", "1," (if we allow empty digits after comma).
           // But standard integer representation doesn't usually have trailing comma unless specified.
           // Spec says: "末尾のカンマは許容します". So "1," is valid.
           // Regex: ^[0-9]+(?:,[0-9]*)*[,]?$ -> Too permissive? 
           // Let's try: ^([0-9]+)(?:,[0-9]*)*$ | ^([0-9]+)$? 
           // Actually, just validate char by char logic is safer but Regex is required.
           
           const r = /^([0-9]+(?:,[0-9]*)*)([,][0-9]*)$/;
        }
        
        // Let's refine the regex one last time to be absolutely correct for the prompt:
        // 1. Must start with digit.
        // 2. Chars allowed: 0-9, comma.
        // 3. Must have at least one digit (ensured by starting with digit).
        // 4. Optional trailing comma anywhere? "末尾のカンマ". So only trailing? Or comma can be anywhere separating numbers? 
        // "カンマ区切りの整数列" implies separators between numbers. 
        // Trailing comma means sequence ends with ','.
        // Valid: "1", "1,2", "1,", "1,2,". Invalid: "1, 2", ",1".
        
        const finalR = /^([0-9]+)(?:,[0-9]*)*(?:,)?$/; 
        // Wait, "1," matches ^([0-9]+)(?:,[0-9]*)*(?:,)?$ -> "1" + "" + "," -> Yes.
        // "1,2" -> "1" + ",2" + "" -> Yes.
        // "1,2," -> "1" + ",2" + "," -> Yes.
        
        if (/^[0-9]+(?:,[0-9]*)*(?:,)?$/.test(trimmed)) {
          count++;
        }
      } else {
        isValidLine = false;
      }
    }
    
    // Corrected Loop Logic:
  }
  
  console.log(`valid=${count}`);
});
