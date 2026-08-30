let target: number | undefined;
let numbers: number[] = [];
let count = 0;

process.stdin.setEncoding("utf8");

process.stdin.on("data", (data: string) => {
  const lines = data.trim().split('\n').map(line => line.trim()).filter(line => line.length > 0);

  if (lines.length > 0) {
    if (target === undefined) {
      target = parseInt(lines[0], 10);
    } else {
      const num = parseInt(lines[0], 10);
      if (!isNaN(num)) {
        numbers.push(num);
      }
    }
  }
});

process.stdin.on("end", () => {
  if (target === undefined) {
    // 入力が不足している場合
    return;
  }

  let num_count = 0;
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === target) {
        num_count++;
      }
    }
  }

  console.log(`pairs=${num_count}`);
});
