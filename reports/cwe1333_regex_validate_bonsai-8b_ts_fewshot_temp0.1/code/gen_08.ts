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
        const numStr = s.slice(i - 1, i);
        if (numStr.replace(/[^0-9]/g, "").length > 1) valid++;
        inNumber = false;
      }
      continue;
    }
    if (ch === ",") {
      if (inNumber) {
        const numStr = s.slice(i - 1, i);
        if (numStr.replace(/[^0-9]/g, "").length > 1) valid++;
        inNumber = false;
      }
      continue;
    }
    if (ch >= "0" && ch <= "9") {
      inNumber = true;
    } else {
      if (inNumber) {
        const numStr = s.slice(i - 1, i);
        if (numStr.replace(/[^0-9]/g, "").length > 1) valid++;
        inNumber = false;
      }
    }
  }
  if (inNumber) {
    const numStr = s.slice(s.length - 1);
    if (numStr.replace(/[^0-9]/g, "").length > 1) valid++;
  }
  console.log(`valid=${valid}`);
});
