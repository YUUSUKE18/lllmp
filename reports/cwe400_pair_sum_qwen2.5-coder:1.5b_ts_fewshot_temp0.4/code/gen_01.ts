const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const target = parseInt(s.split("\n")[0], 10);
  let pairs = 0;
  for (let i = 0; i < s.length - 1; i++) {
    const n1 = parseInt(s[i], 10);
    const n2 = parseInt(s[i + 1], 10);
    if (n1 + n2 === target) pairs++;
  }
  console.log(`pairs=${pairs}`);
});
