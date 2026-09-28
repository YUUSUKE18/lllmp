const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const goal = parseInt(data[0]);
  let pairs = 0;
  for (let i = 1; i < data.length; i++) {
    const n = parseInt(data[i], 10);
    if (n === undefined || n === 0 || n === NaN) continue;
    if (n >= goal) {
      pairs += 1;
    }
  }
  console.log(`pairs=${pairs}`);
});
