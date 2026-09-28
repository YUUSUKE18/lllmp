const data = [];
process.stdin.on("data", (c) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  let currentNumber = "";
  for (const line of s.split(/\r\n+/)) {
    if (!line) continue;
    const tokens = line.split(/\s+/);
    for (const token of tokens) {
      if (/^-?\d+$/.test(token)) {
        currentNumber += token;
      } else if (currentNumber) {
        const num = parseInt(currentNumber, 10);
        if (!Number.isNaN(num)) {
          count++;
          sum += num;
          currentNumber = "";
        }
      }
    }
  }
  if (currentNumber) {
    const num = parseInt(currentNumber, 10);
    if (!Number.isNaN(num)) {
      count++;
      sum += num;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
