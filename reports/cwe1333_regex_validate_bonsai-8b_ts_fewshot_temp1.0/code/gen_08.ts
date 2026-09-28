const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  let inNumber = false;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === "\n") {
      valid++;
      inNumber = false;
      continue;
    }
    if (/[0-9,]/.test(ch)) {
      if (!inNumber) {
        inNumber = true;
        valid++;
      }
    } else if (/[,]/.test(ch) && inNumber) {
      valid++;
      inNumber = false;
    } else if (/[,]/.test(ch)) {
      valid++;
    } else if (/[0-9]/.test(ch)) {
      inNumber = true;
    } else if (/[,]/.test(ch) && !inNumber) {
      valid++;
    }
  }
  console.log(`valid=${valid}`);
});
