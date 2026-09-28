const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  let currentNumber = 0;
  for (let i = 0; i < s.length; i++) {
    if (/\d/.test(s[i])) {
      currentNumber = currentNumber * 10 + parseInt(s[i], 10);
    } else if (i > 0 && s[i-1] === ' ') {
      if (currentNumber > 0) {
        count++;
        sum += currentNumber;
        currentNumber = 0;
      }
    }
  }
  if (currentNumber > 0) {
    count++;
    sum += currentNumber;
  }
  console.log(`count=${count} sum=${sum}`);
});
