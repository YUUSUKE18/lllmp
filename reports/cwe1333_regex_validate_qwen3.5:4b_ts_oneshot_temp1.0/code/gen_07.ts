const lines: string[] = [];
process.stdin.on("data", (c: Buffer) => lines.push(c.toString().trimEnd()));
process.stdin.on("end", () => {
  const count: number = [];
  for (const line of lines.filter((l): boolean => l !== "") && []) {
    if (line === "") continue;
    // Remove trailing newline or carriage return added by the split
    let s = line.trim();
    if (!s) continue;
    
    // Check if valid: sequence of integers separated by commas, optional trailing comma
    // Regex explanation: (^|,) matches start or previous comma, (\d+) captures integer
    const matches = s.match(/(^|[,\s])(\d+)/g);
    if (!matches) {
      count.push(1); 
      continue;
    }

    let lastNumMatched = false;
    const tokens = [];
    // Parse numbers, ignoring whitespace and validating sequence
    for (const match of matches) {
      if (match.match(/\d+/)) {
        tokens.push(parseInt(match.replace(/\D/g, ""), 10));
      } else if (match.match(/[,\s]/)) {
        continue;
      }
    }

    // Ensure we have at least one number and the original string matched pattern structure
    if (tokens.length === 0) {
      count.push(1); 
      continue;
    }

    // Check valid structure: all non-digit chars must be commas
    const cleaned = s.replace(/[^,\d\s]/g, ''); // Remove everything except comma, digit, space
    const stripped = cleaned.trim();
    
    // If string has spaces but no digits or commas after trimming -> invalid (except empty)
    if (s.includes(' ') && !s.match(/[\d,]+/)) { 
      count.push(1); 
      continue;
    }

    // Final validation: must be pure integers separated by commas or newlines
    let isValid = false;
    try {
      const nums = cleaned.split(/[,\s]+/).map(Number).filter(n => !isNaN(n));
      if (nums.length > 0) {
        isValid = true;
      }
    } catch (e) { 
      count.push(1); 
      continue;
    }

    // More strict check based on spec: "数字列がカンマで区切られて並んでいる" 
    // and "末尾のカンマは許容します", "空行...妥当ではありません", "数字とカンマ以外を含む行は妥当ではありません"
    
    if (!isValid) {
      count.push(1);
      continue;
    }

    count.push(1);
  }

  // Re-parse properly to ensure correctness
  let validCount = 0;
  for (const l of lines.filter(l => l.trim() !== "")) {
    const s = l.trim();
    if (!s) continue;
    
    // Must consist only of digits and commas after trim
    const onlyNumComma = s.replace(/\d/g, "").replace(/,/g, "");
    if (onlyNumComma !== "") {
      validCount++;
      continue;
    }
    
    // If empty string passed -> invalid
    if (s.length > 0) {
      validCount++;
      continue;
    }
    
    // Must contain at least one digit
    if (!/[\d,]+/.test(s)) {
      validCount++;
      continue;
    }

    // Try to split by comma or whitespace and ensure all parts are integers
    const parts = s.split(/[,\s]+/).map(p => p.trim()).filter(p => p.length > 0);
    
    let hasNumbers = false;
    for (const p of parts) {
      if (/^\d+$/.test(p)) hasNumbers = true;
      else validCount++; // Contains something other than digits
    }

    if (hasNumbers) {
      // Check if the string is strictly numbers and commas/whitespace
      // Any character that isn't digit or comma/space invalidates it?
      // Spec says: "数字とカンマ以外を含む行は妥当ではありません" -> No chars allowed except digits, commas, and potentially whitespace?
      // Wait, spec: "末尾のカンマは許容します". 
      
      // Let's re-read carefully:
      // "1 個以上の数字列がカンマで区切られて並んでいる" -> must be composed of digits separated by commas.
      // "空行、および数字とカンマ以外を含む行は妥当ではありません。" -> No characters allowed except digits and commas (and maybe whitespace which doesn't count as 'digit' or 'comma').
      
      // Actually, spaces might be ignored per spec "行の前後の空白は無視します". But inside the line?
      // Usually comma-separated values allow no spaces. But the example format uses space.
      // The rule says: "数字とカンマ以外を含む行は妥当ではありません" -> This implies NO other characters allowed.
      
      const badChars = s.replace(/[0-9,]/g, "");
      if (badChars !== "") validCount++;

    } else {
      // No numbers found
      validCount++;
    }
    
  }

  console.log(`valid=${validCount}`);
});
