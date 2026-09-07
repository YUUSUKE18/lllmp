const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const target = parseInt(s.split(/\s+/)[0], 10);
  let pairs = 0;
  for (let i = 1; i < s.split(/\s+/).length - 1; i++) {
    for (let j = i + 1; j < s.split(/\s+/).length; j++) {
      const a = parseInt(s.split(/\s+/)[i], 10);
      const b = parseInt(s.split(/\s+/)[j], 10);
      if (a + b === target) {
        pairs++;
      }
    }
  }
  console.log(`pairs=${pairs}`);
});
