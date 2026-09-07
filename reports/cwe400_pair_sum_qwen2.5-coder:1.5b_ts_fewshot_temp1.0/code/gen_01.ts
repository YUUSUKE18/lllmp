const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const target = parseInt(s.split("\n")[0], 10);
  let count = 0;
  for (let i = 1; i < s.split("\n").length; i++) {
    const n = parseInt(s.split("\n")[i], 10);
    if (!Number.isNaN(n)) {
      for (let j = i + 1; j < s.split("\n").length; j++) {
        const m = parseInt(s.split("\n")[j], 10);
        if (!Number.isNaN(m)) {
          if (n + m === target) {
            count++;
          }
        }
      }
    }
  }
  console.log(`pairs=${count}`);
});
