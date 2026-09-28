const data = [];
process.stdin.on("data", (c) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  let numStr = "";
  for (const ch of s) {
    if (ch === '\n') {
      if (numStr.trim() !== "") {
        const n = parseInt(numStr, 10);
        if (!Number.isNaN(n)) {
          sum += n;
          count++;
        }
        numStr = "";
      }
    } else if (ch === '\r') {
      if (numStr.trim() !== "") {
        const n = parseInt(numStr, 10);
        if (!Number.isNaN(n)) {
          sum += n;
          count++;
        }
        numStr = "";
      }
    } else {
      numStr += ch;
    }
  }
  if (numStr.trim() !== "") {
    const n = parseInt(numStr, 10);
    if (!Number.isNaN(n)) {
      sum += n;
      count++;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
