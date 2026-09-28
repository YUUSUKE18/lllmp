const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  let current = "";
  for (const ch of s) {
    if (ch === "\n") {
      if (current.trim() !== "") {
        const n = parseInt(current, 10);
        if (!isNaN(n)) {
          count++;
          sum += n;
        }
        current = "";
      }
    } else if (ch === ",") {
      if (current.trim() !== "") {
        const n = parseInt(current, 10);
        if (!isNaN(n)) {
          count++;
          sum += n;
        }
        current = "";
      }
    } else {
      current += ch;
    }
  }
  if (current.trim() !== "") {
    const n = parseInt(current, 10);
    if (!isNaN(n)) {
      count++;
      sum += n;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
