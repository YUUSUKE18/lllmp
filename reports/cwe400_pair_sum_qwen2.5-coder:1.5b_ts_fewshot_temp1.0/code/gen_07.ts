let goal: bigint;
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let line = 0, count = 0;
  for (const w of s.split(/\s+/)) {
    if (w.trim() === "") continue;
    if (goal === undefined) goal = BigInt(w);
    else {
      if (count === 1 && BigInt(w) === goal - BigInt(w)) console.log(`pairs=${count}`);
      else if (count === 1 && BigInt(w) !== goal - BigInt(w)) {
        console.log(`pairs=${count}`);
        goal = BigInt(w);
      }
      else if (count === 2 && BigInt(w) === goal - BigInt(w)) {
        console.log(`pairs=${count}`);
        count = 0;
      }
      else if (count === 2 && BigInt(w) !== goal - BigInt(w)) {
        console.log(`pairs=${count}`);
        count = 0;
        goal = BigInt(w);
      }
      count++;
    }
  }
});
