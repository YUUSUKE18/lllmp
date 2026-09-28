const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  let currentNumber = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === "\n") {
      if (currentNumber !== 0) {
        count++;
        sum += currentNumber;
        currentNumber = 0;
      }
      continue;
    } else if (ch >= "0" && ch <= "9") {
      currentNumber = currentNumber * 10 + (ch.charCodeAt(0) - "0".charCodeAt(0));
    } else if (ch === "+" || ch === "-") {
      currentNumber = currentNumber * 10 + (ch.charCodeAt(0) - "0".charCodeAt(0));
    }
    if (currentNumber !== 0 && ch === " " || ch === "\t") {
      count++;
      sum += currentNumber;
      currentNumber = 0;
    }
  }
  if (currentNumber !== 0) {
    count++;
    sum += currentNumber;
  }
  console.log(`count=${count} sum=${sum}`);
});
