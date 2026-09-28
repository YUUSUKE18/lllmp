const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  let currentNumber = 0;
  let inNumber = false;
  for (const line of s.split(/\r?\n+/)) {
    if (line.trim() === "") continue;
    const parts = line.split(/\s+/);
    if (parts.length === 0) continue;
    const firstPart = parts[0];
    if (/^-?\d+$/.test(firstPart)) {
      if (inNumber) {
        currentNumber = parseInt(firstPart, 10);
        sum += currentNumber;
        count++;
      } else {
        if (/^-?\d+$/.test(firstPart)) {
          currentNumber = parseInt(firstPart, 10);
          inNumber = true;
          count++;
          sum += currentNumber;
        }
      }
    } else if (inNumber) {
      sum += currentNumber;
      count++;
      inNumber = false;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
