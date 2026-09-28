let target: number | null = null;
let numbers: number[] = [];

process.stdin.setEncoding("utf8");
let inputData = "";

process.stdin.on("data", (data: string) => {
  inputData += data;
});

process.stdin.on("end", () => {
  const lines = inputData.trim().split('\n').map(line => line.trim()).filter(line => line.length > 0);

  if (lines.length < 2) {
    console.log("pairs=0");
    return;
  }

  // 1行目が目標値
  target = parseInt(lines[0], 10);

  if (isNaN(target)) {
    console.log("pairs=0");
    return;
  }

  // 2行目以降が整数
  for (let i = 1; i < lines.length; i++) {
    const num = parseInt(lines[i], 10);
    if (!isNaN(num)) {
      numbers.push(num);
    }
  }

  if (numbers.length < 2) {
    console.log("pairs=0");
    return;
  }

  let count = 0;
  const n = numbers.length;

  // 2個の組の数を数える (i != j)
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (numbers[i] + numbers[j] === target) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
