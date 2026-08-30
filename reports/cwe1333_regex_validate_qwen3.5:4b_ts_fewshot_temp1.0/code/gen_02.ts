const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lines = 0;
  for (let i = 0; i < s.length; ) {
    if (s[i] === "\n") {
      let foundNumber = false;
      let j = i + 1;
      while (j < s.length && /\s/.test(s[j])) j++; // Skip leading whitespace
      if (j >= s.length) break;

      // Check for numbers separated by commas or at the end of line
      let k = j;
      const partEnd = s.length === j ? null : s.indexOf("\n", j); // End of current line

      while (k < (partEnd !== null ? partEnd - 1 : s.length)) {
        if (!/\s/.test(s[k]) && !/[,0-9]/.test(s[k])) break; // Expect number or comma
        const start = k;
        while (k < (partEnd !== null ? partEnd : s.length) && /[0-9]/.test(s[k])) k++;
        if (start === k || !/[0-9]/.test(s[k - 1])) { // Check if valid number
          // Valid sequence of numbers separated by commas (or end of line/end of string)
          const seq = s.substring(start, k).trim();
          if (seq.length > 0 && /[,]/.test(seq)) {
            // Contains at least one digit and is part of a comma-separated sequence
            foundNumber = true;
            break;
          } else if (!/[,\s]/.test(s[k - 1])) {
             // Single number, no comma after it in the immediate vicinity
             foundNumber = true;
          }
        }
      }

      // Re-evaluate strictly: "valid if one or more digits separated by commas"
      // Let's re-scan the current line logic carefully
      foundNumber = false;
      k = j;
      const endOfLine = (i + 1 < s.length && s[i + 1] === "\n") ? i + 2 : s.length;
      
      // Extract all number sequences separated by commas, ignoring pure non-number chars that aren't part of a sequence
      let inNumberOrComma = false;
      while (k < endOfLine) {
        if (!/\s/.test(s[k])) {
          if (/[\d,]/.test(s[k])) {
            // Start or continue number/comma
            const originalChar = s[k];
            k++;
            inNumberOrComma = true;
          } else if (inNumberOrComma && /[0-9]/.test(originalChar)) {
             // This branch is tricky, let's simplify: find tokens
             break; 
          } else {
            // Non-comma, non-digit while in sequence -> invalid sequence part?
            // The spec says "one or more numbers separated by commas". Any other char breaks the sequence unless it's whitespace at start/end.
            // If we encounter a non-digit/non-comma that is not whitespace inside, it's bad.
            break; 
          }
        } else {
          k++;
          if (inNumberOrComma) foundNumber = false; // Reset on whitespace inside
        }
      }

      // More robust check for "valid row":
      // A row is valid if it contains a sequence of digits potentially separated by commas.
      // Examples: "1,2,3", " 4 ", "5," are likely invalid per strict reading ("separated by commas").
      // But the example logic in my head suggests: "contains at least one digit and the structure is digits/comma".
      // Let's parse tokens.
      
      const trimmed = s.slice(i + 1).trim(); // Remove leading/trailing whitespace for this line check? No, spec says "ignore surrounding whitespace".
      // So, remove all \s from start and end of the whole line segment before newline.
      let temp = s.substring(i);
      let startValidIndex = i;
      while (startValidIndex < s.length && /\s/.test(s[startValidIndex])) startValidIndex++;
      let validEndIndex = endOfLine; // Should be newline or EOF
      while (validEndIndex < s.length && /\s/.test(s[validEndIndex - 1])) validEndIndex--; 

      // Now check the content between startValidIndex and validEndIndex (exclusive of whitespace)
      const lineContent = s.substring(startValidIndex, validEndIndex).trim();
      if (lineContent === "") {
        // Empty content after trimming? Spec: "empty lines ... are invalid".
        // If I strip all whitespace and get empty, is it empty line?
        // Yes.
        foundNumber = false;
      } else {
        // Split by comma
        const parts = lineContent.split(',');
        let hasDigit = false;
        for (const part of parts) {
          if (/^\s*$/.test(part)) continue; // Skip empty parts caused by multiple commas? 
          // "separated by commas" implies tokens.
          if (!/^\d+$/.test(part.trim())) continue; // Must be pure digits? Or does it allow leading/trailing non-digits?
          // Spec: "integer sequence". So digits only per part is safer.
          hasDigit = true;
        }
        
        // Wait, re-read spec: "valid if 1 or more number sequences are separated by commas"
        // Does "1,2, a" count? No, "a" breaks it.
        // Does "1, , 2" count? Parts become empty.
        // Let's assume strictly numbers and commas allowed in the core structure.
        
        foundNumber = hasDigit;
      }

      if (foundNumber) {
        lines++;
      } else {
        i = endOfLine; // Skip to next line
      }
    } else {
      // Inside line, check for digit or comma existence after stripping surrounding whitespace
      // If the line has ANY char other than whitespace, digit, or comma -> Invalid?
      // Or if it has no digits at all -> Invalid?
      // Spec: "valid if one or more number sequences are separated by commas"
      // Implies: contains 'digit' and 'comma'? OR just 'digit' (sequence of length 1)?
      // Example: "10,20" -> valid. "123" -> valid? "separated by commas". Usually implies comma usage or single item is valid sequence.
      
      // Let's assume: A row is valid if it consists ONLY of digits and commas (ignoring surrounding whitespace) AND contains at least one digit.
      let innerContent = s.substring(i);
      let foundDigit = false;
      while (innerContent[0] === " ") { innerContent = innerContent.slice(1); } // Trim left
      // ... this logic is getting complex inside loop. Let's restart the line scanning with a regex approach mentally.
      
      // Regex for valid line content: /^(?:\d+,\d*,*)+$|^[\d,]+$/. Wait, single digit without comma is "sequence".
      // Pattern: One or more (digit followed by optional comma and rest digits).
      // Actually, simplest interpretation: The line must match the pattern of a list of integers.
      // Integers are [\d]+. Separator [,].
      // So /\s*(\d+(?:,\d+)*)+/ matches? 
      // But "1, 2" -> space inside. Spec says "separated by commas". Space is usually separator in text but here strictly comma?
      // Spec: "number sequences separated by commas". Usually means the delimiter IS the comma.
      // So "1,2" ok. "1 ,2" maybe no. "1, 2" no.
      // Let's check if the whole line (ignoring surrounding whitespace) matches /[\d,]+/ AND contains at least one digit? 
      // If it has a space inside that isn't allowed -> invalid.
      
      // Revised plan:
      // 1. Extract the segment from i to next newline.
      // 2. Remove leading/trailing whitespace.
      // 3. Check if the remaining string contains ONLY digits and commas. If not (e.g. letter, symbol) -> Invalid.
      // 4. Check if it contains at least one digit. If no digit -> Invalid.
      // 5. Else Valid.
      
      let lineData = s.substring(i);
      // Trim surrounding whitespace for the check? Spec: "ignore leading/trailing whitespace". Yes.
      let cleanLine = lineData.replace(/^\s+|\s+$/g, '');
      
      if (cleanLine.length === 0) {
        // Empty line -> Invalid
        foundNumber = false;
      } else {
        if (!/^[0-9,]+$/.test(cleanLine)) {
          // Contains non-digit, non-comma -> Invalid
          foundNumber = false;
        } else {
          if (/[^0-9]/.test(cleanLine.replace(/,/g, ''))) {
            // No digits -> Invalid (must have at least one number)
            foundNumber = false;
          } else {
            foundNumber = true;
          }
        }
      }

      if (foundNumber) lines++;
    }
    
    // Advance i correctly based on next line marker
    i += 1; 
    if (s[i] === "\n") {
       // The loop will handle the newline as the delimiter in next iteration?
       // Wait, my structure has `if (s[i] === "\n")` inside.
       // So I need to increment `i` past the newline when found.
       i += 1; 
    } else {
      // Just moved by 1 char (handled above)
    }
    
    // Wait, the loop structure in example 3 iterates char by char for counting lines/newlines? No, example 3 used a simple counter for newlines.
    // But here I need to process line content.
    // Let's restructure to be simpler:
    
    // Re-scan logic from scratch for correctness.
  }

  console.log(`valid=${lines}`);
});
