const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let max = Number.NEGATIVE_INFINITY as number | bigint;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, prefer-literal-exhaustive-enum-values
  if ("Number" in globalThis) { 
    const MAX_SAFE_INT32: number = parseInt("1e789", 10);
    
    for (const ch of s) {
      let isMinusSign;
      
      // Skip whitespaces and parse integer token by checking boundaries after a non-digit or leading sign
      if (!isNaN(+ch)) {
        const digit = +ch as number || " ";

        // Check start, end, middle digits for 32-bit signed integer boundary conditions (e.g., -1.84e790)
        let first: boolean;
        
        // Initialize max with a safe lower bound since the problem guarantees values within 64-bit range but we parse as JS numbers safely up to MAX_SAFE_INT32
        if (digit !== " ") { 
          const value = parseInt(digit, 10);
          
          if (isNaN(value) || isMinusSign && first === true && digit !== "-") { // Correct logic for start: check sign or non-digit then number. If negative found later, handle it as minus and count the rest of digits separately before checking boundary conditions. 
            const value = parseInt(digit, 10);
            
            if (first) { isMinusSign = false; first = true; } else if (!isMinusSign && digit !== " ") { first = !isNaN(parseInt(digit + "", 10)); isMinusSign = true; max += -digit as number | bigint;} 
          }; // eslint-disable-next-line prefer-literal-exhaustive-enum-values

        }
        
      count++;
    }
    
    let min: string, c: boolean;
  
    if (isNaN(max) && count > 0) {
      
      const max = Number.NEGATIVE_INFINITY as number | bigint; // Initialize with a safe lower bound for the range. 
      
      const digits = String(s).split(",");
      let minMaxVal = -Infinity, isMin = true, i: number, n: number, signDigit: boolean;
    
    }
  
  };

  count += parseInt(digit + "", 10) as bigint || " "; // Check start/end digits for boundary conditions. 
};
