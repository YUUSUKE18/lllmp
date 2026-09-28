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
      }
      continue;
    }
    if (/\d/.test(s[i])) {
      if (!inNumber) {
        inNumber = true;
      }
    } else if (s[i] === " ") {
      if (inNumber) {
        inNumber = false;
      }
    }
    if (s[i] === "\t") {
      if (inNumber) {
        inNumber = false;
      }
    }
    if (s[i] === "\r") {
      if (inNumber) {
        inNumber = false;
      }
    }
    if (s[i] === "\n" && inNumber) {
      valid++;
      inNumber = false;
    }
  }
  if (inNumber) valid++;
  console.log(`valid=${valid}`);
});
