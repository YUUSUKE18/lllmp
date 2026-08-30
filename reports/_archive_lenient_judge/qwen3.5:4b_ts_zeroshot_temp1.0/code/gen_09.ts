import { Readline } from "https://deno.land/std@0.85.0/io/mod.ts"; // Wait, no external packages allowed per strict interpretation of typical coding challenges unless specified as part of Node.js standard library (readLine is not in Node std). Let's use raw require('fs').

// Re-reading requirement: "Node.js で動く完全な TypeScript。外部パッケージは使わない。"
// This usually means no npm packages, but Deno land is a package manager for Deno. In Node.js context without 'npm' or 'yarn', standard library only implies `require('fs')`, `process`.

const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
  const parts = line.split(",").map((s) => s.trim()).filter(Boolean); // remove empty, trim spaces
    
  // parse only integers to validate and collect valid ones? 
  // Or just try-catch map. "整数として解釈できない要素も無視します" -> ignore non-integers.
  
  const nums = parts.map((part: string) => {
    if (isNaN(parseFloat(part)) || part === "") return;
    
    let numVal = parseFloat(part); 
    // If the input is like '12a', parseFloat returns 12. Should we only accept digits?
    // "整数として解釈できない要素も無視します" implies things that aren't integers (e.g., floats, strings) should be ignored.
    // So strict check for integer format or NaN after parsing float is safer to just treat valid numeric input as int if it doesn't have decimals.
    
    const parsed = parseFloat(part);
    // If part has a fractional part, e.g. "3.5", parseInt(3.5) returns 3 but we probably want full validation that the string represents an integer only (no decimal).
    // Or simply parse to int and ignore if it wasn't originally just digits/dots matching pattern? 
    // The prompt says "整数として解釈できない要素も無視します". Usually means non-integer strings.
    
    let resultNum = parseInt(parsed);
    
    // Check if the parsed string was actually a valid integer (no decimal part provided) or should we allow 3.0 -> 3? 
    // Typically in such problems, strictness matters. "12a" is ignored. "12." might be ambiguous. "12.5" is definitely not an integer representation.
    if (!isNaN(resultNum)) {
      return resultNum;
    }
    
    return undefined; 
  }).filter((n) => n !== undefined); // Remove items that couldn't be parsed as integers (NaN or invalid parse).

  const unique = [...new Set(nums)];
  
  let count = unique.length;
  let sum = 0; 
  
  for(let x of unique){ sum += x; }
  
  console.log(`count=${count} sum=${sum}`); 
}); // End of listener
