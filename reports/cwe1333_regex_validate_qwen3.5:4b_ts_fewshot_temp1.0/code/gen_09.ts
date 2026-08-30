const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  for (let i = 0; i < s.length; ) {
    if (s[i] === "\n" || s[i] === "\r") {
      if (i > 0) valid++;
      i++;
      continue;
    }
    let lineStart = i;
    while (i < s.length && /\s/.test(s[i])) i++;
    let lineEnd = i;
    while (lineEnd < s.length && !/\s/.test(s[lineEnd])) {
      const ch = s[lineEnd];
      if (ch === "," || (ch >= "0" && ch <= "9")) {
        lineEnd++;
      } else {
        break;
      }
    }
    let lineContent = s.slice(lineStart, lineEnd);
    if (lineContent.length > 0) {
      const trimmed = lineContent.trim();
      if (!trimmed || !/^[0-9,\s]+$/.test(trimmed)) {
        continue;
      }
      // Verify all characters are digits or commas in the original non-whitespace parts
      let hasInvalidChar = false;
      for (let k = 0; k < trimmed.length; k++) {
        const ch = trimmed[k];
        if (!/^\d$/.test(ch) && ch !== ",") {
          hasInvalidChar = true;
          break;
        }
      }
      if (hasInvalidChar) continue;

      // Check if every non-comma character is a digit
      const digits = trimmed.split(/[,\s]+/).map(p => p.trim()).filter(p => p.length > 0);
      if (digits.every(d => /^\d+$/.test(d))) {
        valid++;
      } else {
        continue;
      }
    }
    i = lineEnd;
  }
  console.log(`valid=${valid}`);
});
