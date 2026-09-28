import { createInterface } from "readline";

const rl = createInterface({ input: process.stdin, output: process.stdout });

let n: number | undefined;
rl.once("line", (line) => {
  const trimmed = line.trim();
  if (!trimmed || isNaN(Number(trimmed))) return;
  
  n = parseInt(trimmed);
});

const readIntegers = (): number[] => {
  const integers: number[] = [];
  let count = 0;
  let currentLine: string | null = null;
  
  rl.on("line", (line) => {
    if (!currentLine) {
      currentLine = line.trim();
      return;
    }
    
    const parts = currentLine.split(/\s+/);
    for (const part of parts) {
      const parsed = parseInt(part, 10);
      if (!isNaN(parsed)) {
        integers.push(parsed);
        count++;
      }
    }
    
    if (count === n && !line.startsWith("\n")) {
      currentLine = null;
    } else {
      currentLine = line.trim();
    }
  });

  return integers;
};

const main = () => {
  const lines: string[] = [];
  let hasInput = false;

  rl.on("line", (line) => {
    if (!hasInput) {
      const trimmed = line.trim();
      if (!trimmed) return;
      n = parseInt(trimmed);
      hasInput = true;
    }
    lines.push(line);
  });

  rl.on("close", () => {
    const integers: number[] = [];
    
    for (const line of lines) {
      if (!line.trim()) continue;
      
      const parts = line.split(/\s+/);
      for (const part of parts) {
        const parsed = parseInt(part, 10);
        if (!isNaN(parsed)) {
          integers.push(parsed);
        }
      }
    }

    const actualCount = integers.length;
    const sum = integers.reduce((a, b) => a + b, 0);
    
    console.log(`count=${actualCount} sum=${sum}`);
  });
};

main();
