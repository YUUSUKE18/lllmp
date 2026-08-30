let target: number | null = null;
let numbers: number[] = [];

process.stdin.on("data", (c: Buffer) => {
  const data = c.toString().trim();
  if (data === "") return;

  if (target === null) {
    target = parseInt(data, 10);
    if (!isNaN(target)) {
      // 2行目以降の入力として扱う
      numbers.push(parseInt(data, 10));
    }
  } else {
    // 2行目以降の入力として扱う
    const num = parseInt(data, 10);
    if (!isNaN(num)) {
      numbers.push(num);
    }
  }
});

process.stdin.on("end", () => {
  if (target === null || numbers.length < 2) {
    // 不十分な入力の場合は何も出力しない（仕様上、入力が与えられると仮定）
    return;
  }

  let count = 0;
  const n = numbers.length;

  // 2つの組 (i, j) を探す (i != j)
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (numbers[i] + numbers[j] === target) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
