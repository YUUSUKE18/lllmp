const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const target = parseInt(s.split("\n")[0], 10);
  let pairs = 0;
  for (let i = 0; i < s.length - 1; i++) {
    for (let j = i + 1; j < s.length; j++) {
      const sum = parseInt(s[i], 10) + parseInt(s[j], 10);
      if (sum === target) pairs++;
    }
  }
  console.log(`pairs=${pairs}`);
});
