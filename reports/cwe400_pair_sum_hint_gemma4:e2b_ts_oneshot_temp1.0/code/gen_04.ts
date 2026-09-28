let target: number | null = null;
let numbers: number[] = [];

const readline = () => {
  const lines: string[] = [];
  const inputLines: string[] = [];

  process.stdin.on("data", (data: Buffer) => {
    const chunk = data.toString();
    const linesArray = chunk.split('\n');
    for (const line of linesArray) {
      if (line.trim() !== "") {
        lines.push(line.trim());
      }
    }
    inputLines.push(...lines);
  });

  process.stdin.on("end", () => {
    if (inputLines.length === 0) return;

    if (target === null) {
      target = parseInt(inputLines[0], 10);
    } else {
      // 2行目以降を数値としてパース
      for (let i = 1; i < inputLines.length; i++) {
        const num = parseInt(inputLines[i], 10);
        if (!isNaN(num)) {
          numbers.push(num);
        }
      }
    }

    if (target !== null && numbers.length >= 2) {
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
    }
  });
};

readline();
