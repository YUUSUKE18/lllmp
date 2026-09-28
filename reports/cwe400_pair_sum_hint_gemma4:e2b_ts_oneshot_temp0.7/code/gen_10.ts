let target: number | null = null;
let numbers: number[] = [];

process.stdin.on("data", (c: Buffer) => {
  const line = c.toString().trim();
  if (line === "") return;

  if (target === null) {
    target = parseInt(line, 10);
    if (isNaN(target)) return;
  } else {
    const num = parseInt(line, 10);
    if (!isNaN(num)) {
      numbers.push(num);
    }
  }
});

process.stdin.on("end", () => {
  if (target === null || numbers.length < 2) {
    console.log("pairs=0");
    return;
  }

  let pairCount = 0;
  const n = numbers.length;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (numbers[i] + numbers[j] === target) {
        pairCount++;
      }
    }
  }

  console.log(`pairs=${pairCount}`);
});
