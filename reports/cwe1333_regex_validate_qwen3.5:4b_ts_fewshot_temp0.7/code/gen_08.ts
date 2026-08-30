const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lines = 0;
  for (const ch of s) if (ch === "\n") lines++;
  
  const lineCount = s.split("\n").length;
  if (lineCount === 0) {
    console.log("valid=0");
    return;
  }

  let valid = 0;
  for (let i = 0; i < lineCount; i++) {
    const trimmed = s.split("\n")[i].trim();
    if (trimmed === "") continue;

    const parts: string[] = [];
    let current = "";
    
    for (const ch of trimmed) {
      if (ch === ",") {
        parts.push(current);
        current = "";
      } else {
        current += ch;
      }
    }
    parts.push(current);

    const hasNonDigit = /\D/.test(trimmed);
    if (hasNonDigit) continue;

    let allValid = true;
    for (const part of parts) {
      if (part.length === 0) {
        allValid = false;
        break;
      }
      const n = parseInt(part, 10);
      if (Number.isNaN(n)) {
        allValid = false;
        break;
      }
    }

    if (allValid) valid++;
  }

  console.log(`valid=${valid}`);
});
