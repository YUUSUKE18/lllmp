let target: number = 0;
let numbers: number[] = [];

const readline = () => {
  const lines: string[] = [];
  const inputLines = [];

  process.stdin.on("data", (c: Buffer) => {
    const data = c.toString();
    const linesArray = data.split('\n');
    inputLines.push(...linesArray);
  });

  process.stdin.on("end", () => {
    if (inputLines.length > 0) {
      target = parseInt(inputLines[0].trim(), 10);
      for (let i = 1; i < inputLines.length; i++) {
        const line = inputLines[i].trim();
        if (line) {
          const num = parseInt(line, 10);
          if (!isNaN(num)) {
            numbers.push(num);
          }
        }
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
    }
  });
};

readline();
