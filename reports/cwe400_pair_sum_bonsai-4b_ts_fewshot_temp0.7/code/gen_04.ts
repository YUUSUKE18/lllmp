const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let goal = parseInt(process.stdin.read().trim());
  let pairs = 0;
  let numbers: Buffer[] = s.split(/\s+/);
  for (let i = 0; i < numbers.length; i++) {
    const n = parseInt(numbers[i].trim());
    if (n === undefined || n === NaN || n === "") continue;
    if (n >= goal) {
      pairs += 1;
      if (pairs >= 2) break;
    }
  }
  console.log(`pairs=${pairs}`);
});
