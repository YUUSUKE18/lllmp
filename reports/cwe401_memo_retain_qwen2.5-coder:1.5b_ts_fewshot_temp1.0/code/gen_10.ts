const input: string[] = [];
process.stdin.on("data", (chunk: Buffer) => input.push(chunk.toString()));
process.stdin.on("end", () => {
  let total = 0;
  const memo = new Map<number, number>();
  for (const query of input) {
    let n = parseInt(query, 10);
    if (n === 1) {
      total += 0;
    } else if (memo.has(n)) {
      total += memo.get(n);
    } else {
      memo.set(n, total + (n % 2 === 0 ? n / 2 : 3 * n + 1));
      total += memo.get(n);
    }
  }
  console.log(`total=${total}`);
});
