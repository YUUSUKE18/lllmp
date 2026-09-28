const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  let currentNumber = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === " ") continue;
    if (s[i] === "\n") {
      if (currentNumber !== 0) {
        count++;
        sum += currentNumber;
        currentNumber = 0;
      }
      continue;
    }
    if (s[i] < "0" || s[i] > "9") continue;
    currentNumber = currentNumber * 10 + parseInt(s[i], 10);
  }
  if (currentNumber !== 0) {
    count++;
    sum += currentNumber;
  }
  console.log(`count=${count} sum=${sum}`);
});
