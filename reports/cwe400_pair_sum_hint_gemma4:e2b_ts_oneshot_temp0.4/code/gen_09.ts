let target: number | null = null;
let numbers: number[] = [];

process.stdin.on("data", (c: Buffer) => {
  const line = c.toString().trim();
  if (line === "") return;

  if (target === null) {
    target = parseInt(line, 10);
    if (!isNaN(target)) {
      return;
    }
  }

  if (target !== null) {
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

  let count = 0;
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === target) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
