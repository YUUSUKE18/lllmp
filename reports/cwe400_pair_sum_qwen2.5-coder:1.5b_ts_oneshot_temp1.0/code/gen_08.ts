const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const goal = parseInt(s.split("\n")[0], 10);
  let pairs = 0;
  let numbers = s.split("\n").slice(1).filter(Number.isInteger).map(Number);

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === goal) {
        pairs++;
      }
    }
  }

  console.log(`pairs=${pairs}`);
});
