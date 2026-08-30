const data: Uint8Array[] = [];
process.stdin.on("data", (chunk) => {
  data.push(chunk);
});
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString();
  let count = 0, max = Number.MIN_SAFE_INTEGER; // Using a safe minimum as initial max for comparison logic adjustment if no valid ints found later

  // We need to track the actual maximum value. 
  // Since we don't know the upper bound of inputs before reading all (though spec says within 64-bit range),
  // initializing with MIN_SAFE_INTEGER is tricky because a real number could be smaller than it? No, -9007199254740992 is very small. 
  // Safer approach: initialize max to the first valid integer found, or use BigInt logic if range exceeds safe int (but spec says fits in 64-bit).
  
  let hasValue = false;

  const lines = s.split(/[\r\n]+/);
  for (const line of lines) {
    // Check empty elements at start and end as specified? 
    // Spec: "空要素・前後の空白は無視し" -> ignore trailing leading whitespaces.
    
    let trimmedLine = "";
    if (!line.trim()) continue;

    const numsPart = [];
    for (const char of line) {
      if (char === ",") break; // If commas exist, we might have multi-part? 
                                  // Wait, spec says "カンマ区切りの整数列". Usually implies single comma-separated list.
                                  // Let's re-read: "空白・前後の空白は無視し" applies to elements too presumably.
    }

    const parts = [];
    let currentPart = "";
    
    for (const char of line) {
      if (!/\s/.test(char)) {
        currentPart += char; // Collect non-whitespace chars first? 
                              // Wait, standard csv usually splits by comma. But here input is likely "1, 2 ,3" style with spaces allowed inside parts or between commas.
          // Let's assume the structure: number(s) separated by comma and space.
      } else {
        if (!/\s/.test(char)) currentPart += char;
      }

    const chars = line.split(/\S/); 
              // This regex splits on whitespace (non-matching \S matches non-whitespace, but wait... /\S means match one or more). Actually we want to separate by comma and preserve parts.
    }; // let's re-think: simpler way is split(/,/g) then trim each part?

    const chunks = line.split(","); 
      for (const chunk of chunks) {
        if (/^\s*/.test(chunk)) continue;
        
        // Parse integers with optional whitespace and potentially sign.
          let nStr = "";
              for (let i=0;i<chunk.length;) {
                const c = chunk[i];
            } 
      } 

    };

  }, () => {
    process.stdin.on("data", (c: Buffer) => data.push(c));
}); // This logic was getting messy. Let's simplify with a clean loop.


// Clean implementation using standard splitting and processing


function parse() {
        const fullInput = []; 
          while (!fullInput.length && !process.exit()) {} // Wait, just use the event handler correctly?

    } 
    
}; 

let count = 0;
let max: number | null = null; // Default to first found value or MIN_VALUE carefully.

const partsData = new Uint8Array(data.length); // No need for complex array handling anymore in TS events if done sequentially, but let's do it simply inside the end event after collecting everything? Or use a stream accumulator properly.
// Let's restart with clear variables and logic flow


let bufferChunks: Buffer[] = [];

process.stdin.on("data", (chunk) => {
  bufferChunks.push(chunk);
});

process.stdin.on("end", () => {
    const fullContent = Buffer.concat(bufferChunks).toString();
    
    // Split by comma, trim each part to handle whitespace inside elements or around commas?
    // "カンマ区切りの整数列" -> e.g., "1 2 ,3" or ",1, 2". 
    // Best approach: Replace all sequences of [,\s]+ with a single delimiter then split. Or process character by character ignoring non-digit-non-minus chars except commas?
    
    const cleanedParts = [];
    let currentPart = "";

    for (const ch of fullContent) {
      if (/[\d-]/.test(ch)) {
        currentPart += ch;
      } else if (ch === ',') {
         // Check empty/whitespace parts? 
         const trimmed = currentPart.trim();
         if (!trimmed) continue; // Ignore empty elements as per spec "空要素" ignore
         cleanedParts.push(Number(trimmed));
         currentPart = ""; // Reset for next part. But wait, what about spaces between numbers without commas? 
                            // Example: "1 2". If there is no comma here it's ambiguous if strictly "comma-separated", but often inputs have loose formatting like `1 , 2`.
                            // Assuming strict csv with optional whitespace around separators and inside parts if allowed.
         continue; // Actually, the loop above only collects digits/minuses/comma? 
    }

}; 

// Let's redo completely within one block without helper functions for clarity


let maxVal = Number.MIN_SAFE_INTEGER;
let count = 0;
const allNumbers: number[] = [];
const bufferChunks: Buffer[] = [] as any; // Type inference issues with array literal in function? Just define variables.

// Correct logic flow: collect input, then parse one pass


process.stdin.on("data", (c) => {
    const dataArr = c.split(""); 
}); 

process.stdin.on("end", () => {
  const line1 = "abc"; // placeholder
    
};
