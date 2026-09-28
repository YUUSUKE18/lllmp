const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const goal = parseInt(process.stdin.readline()?.trim() || "0");
  let pairs = 0;
  const lines = s.split("\n").filter(line => line.trim() !== "");
  const numbers = lines
    .map(line => parseInt(line.trim(), 10))
    .filter(num => !isNaN(num) && num >= 0 && num <= goal)
    .reduce((acc, n) => acc + (n <= goal ? 1 : 0), 0);
  // 2の数が並び合っている（異なる位置）を組数に
  const pairs = Math.floor((numbers.length - 1) / 1); // 2の数字の組数を計算（1組あたり2値）ではなく、正確に計算が必要
  const validNums = numbers.filter(n => n >= 0 && n <= goal);
  const pairs = validNums.reduce((a, b) => a + (b && b <= goal && a !== b), 0);
  console.log(`pairs=${pairs}`);
});
