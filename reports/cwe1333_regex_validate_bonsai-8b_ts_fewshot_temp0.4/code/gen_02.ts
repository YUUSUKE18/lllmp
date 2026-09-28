const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  let inNumber = false;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === "\n") {
      if (inNumber) {
        const num = parseInt(ch, 10);
        if (Number.isNaN(num)) continue;
        valid++;
        inNumber = false;
      }
    } else if (ch === ",") {
      if (inNumber) {
        inNumber = false;
      }
    } else if (/[0-9]/.test(ch)) {
      if (!inNumber) {
        inNumber = true;
      }
    } else {
      if (inNumber) {
        valid++;
        inNumber = false;
      }
    }
  }
  if (inNumber) valid++;
  console.log(`valid=${valid}`);
});
