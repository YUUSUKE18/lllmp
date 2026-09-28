function countPairsForTarget(target: number): void {
  const data: Buffer[] = [];
  process.stdin.on("data", (c: Buffer) => data.push(c));
  process.stdin.on("end", () => {
    const s = Buffer.concat(data).toString("utf8");
    const numbers = s.split(/\s+/).filter(f => f.trim() !== "").map(Number);
    let pairs = 0;
    for (let i = 0; i < numbers.length; i++) {
      for (let j = i + 1; j < numbers.length; j++) {
        if (numbers[i] + numbers[j] === target) {
          pairs++;
        }
      }
    }
    console.log(`pairs=${pairs}`);
  });
}

// 2 行目以降の整数が与えられます
countPairsForTarget(Number(process.argv[2]));
