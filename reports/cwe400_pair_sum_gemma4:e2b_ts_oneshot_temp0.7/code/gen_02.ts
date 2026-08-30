let target: number | undefined = undefined;
let numbers: number[] = [];

process.stdin.on("data", (c: Buffer) => {
  const line = c.toString().trim();
  if (line === "") return;

  if (target === undefined) {
    // 1行目は目標値
    target = parseInt(line, 10);
  } else {
    // 2行目以降は整数
    const num = parseInt(line, 10);
    if (!isNaN(num)) {
      numbers.push(num);
    }
  }
});

process.stdin.on("end", () => {
  if (target === undefined || numbers.length < 2) {
    console.log("pairs=0");
    return;
  }

  let count = 0;
  const n = numbers.length;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (numbers[i] + numbers[j] === target) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
