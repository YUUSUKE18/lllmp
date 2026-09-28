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
      if (inNumber) {
        inNumber = false;
        valid++;
      } else if (ch === " ") {
        inNumber = false;
      } else if (ch === "") {
        inNumber = false;
      } else if (Number.isNaN(parseInt(ch, 10))) {
        inNumber = false;
      } else {
        inNumber = true;
      }
    } else if (Number.isNaN(parseInt(ch, 10))) {
      inNumber = false;
    } else {
      inNumber = true;
    }
  }
  if (inNumber) valid++;
  console.log(`valid=${valid}`);
});
