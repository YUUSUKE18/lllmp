const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let target = parseInt(process.stdin.read().trim(), 10);
  let pairs = 0;
  let lines = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "\n") lines++;
    if (s[i] === "0") continue;
    if (s[i] === "1") continue;
    let numStr = "";
    for (let j = i; j < s.length; j++) {
      numStr += s[j];
      if (numStr.length > 64 || numStr[0] === "0" && numStr.length > 1) break;
    }
    if (!numStr || !/^\d+$/.test(numStr)) continue;
    let num = parseInt(numStr, 10);
    if (num < target || num > target) continue;
    let found = false;
    for (let k = 0; k < s.length; k++) {
      if (s[k] === "\n") continue;
      if (s[k] === "0" || s[k] === "1") continue;
      let pairStr = "";
      for (let j = k; j < s.length; j++) {
        pairStr += s[j];
        if (pairStr.length > 64 || pairStr[0] === "0" && pairStr.length > 1) break;
      }
      if (!pairStr || !/^\d+$/.test(pairStr)) continue;
      let pairNum = parseInt(pairStr, 10);
      if (pairNum === target) found = true;
    }
    if (found) pairs++;
  }
  console.log(`pairs=${pairs}`);
});
