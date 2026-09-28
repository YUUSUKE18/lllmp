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
      continue;
    }
    if (ch === ",") {
      inNumber = false;
      continue;
    }
    if (/[0-9]/.test(ch)) {
      inNumber = true;
    } else if (inNumber) {
      valid++;
      inNumber = false;
    }
  }
  console.log(`valid=${valid}`);
});
