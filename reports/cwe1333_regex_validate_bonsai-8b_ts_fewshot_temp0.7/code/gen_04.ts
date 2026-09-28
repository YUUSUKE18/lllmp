const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  let inNumber = false;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === "\n") {
      if (inNumber) valid++;
      inNumber = false;
    } else if (ch === ",") {
      if (inNumber) {
        const numStr = s.substring(i - 1, i + 1);
        if (numStr.trim() && !isNaN(numStr)) valid++;
        inNumber = false;
      }
    } else if (/[0-9]/.test(ch)) {
      inNumber = true;
    } else {
      inNumber = false;
    }
  }
  if (inNumber) valid++;
  console.log(`valid=${valid}`);
});
