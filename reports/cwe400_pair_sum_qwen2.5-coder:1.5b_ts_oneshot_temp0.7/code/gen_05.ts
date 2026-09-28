const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const [target, ...numbers] = s.split(/\s+/);
  let count = 0;
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      const sum = parseInt(numbers[i], 10) + parseInt(numbers[j], 10);
      if (sum === parseInt(target, 10)) {
        count++;
      }
    }
  }
  console.log(`pairs=${count}`);
});
