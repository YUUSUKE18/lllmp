const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  let currentNumber = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === " ") continue;
    if (s[i] === "\n" || s[i] === "") continue;
    if (currentNumber === 0 && !/^-?\d+$/.test(s.slice(i))) continue;
    currentNumber = parseInt(s.slice(i), 10);
    count++;
    sum += currentNumber;
  }
  console.log(`count=${count} sum=${sum}`);
});
