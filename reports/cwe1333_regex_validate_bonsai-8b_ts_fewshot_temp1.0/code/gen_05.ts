const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  let inNumber = false;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "\n") {
      if (inNumber) {
        valid++;
        inNumber = false;
      }
      continue;
    }
    if (s[i] === ",") {
      if (inNumber) {
        inNumber = false;
        const num = parseInt(s.slice(i - 1, i + 1), 10);
        if (!isNaN(num)) valid++;
      }
      continue;
    }
    if (s[i] < "0" || s[i] > "9") {
      if (inNumber) {
        valid++;
        inNumber = false;
      }
      continue;
    }
    inNumber = true;
  }
  if (inNumber) valid++;
  console.log(`valid=${valid}`);
});
