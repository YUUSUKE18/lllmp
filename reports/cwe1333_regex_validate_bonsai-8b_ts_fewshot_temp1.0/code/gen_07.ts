const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  let inNumber = false;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (/[0-9]/.test(ch)) {
      if (!inNumber) inNumber = true;
      if (ch === ',') inNumber = false;
    } else {
      if (inNumber) {
        const n = parseInt(ch, 10);
        if (!Number.isNaN(n)) valid++;
        inNumber = false;
      }
    }
  }
  if (inNumber) valid++;
  console.log(`valid=${valid}`);
});
