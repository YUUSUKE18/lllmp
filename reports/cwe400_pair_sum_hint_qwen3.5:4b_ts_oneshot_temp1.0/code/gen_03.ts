import { ReadLine } from "readline";

const rl = new ReadLine({ input: process.stdin });
let results: number[] = [];

rl.on("data", (line) => {
  if (line.trim() === "") return;
  const target = parseInt(line.trim(), 10);
  if (!Number.isNaN(target)) {
    results.push(parseInt(line.trim(), 10)); // Target value
  } else {
    results.push(0); // Fallback if parse fails, though spec implies valid input format.
  }
});

rl.on("close", async () => {
  let target: number = results.shift();
  const lines: number[][] = [];
  
  // Collect all lines first since we need to read until end
  while (true) {
    const line = await new Promise((resolve, reject) => {
      rl.on("line", resolve);
      rl.once("error", reject);
    });

    if (line.trim() === "") continue; // Skip empty lines
    
    // Parse line into single integer or skip
    const val = parseInt(line.trim(), 10);
    if (!Number.isNaN(val)) {
      lines.push(val);
    } else {
      continue; // Skip non-integer lines in the sequence
    }

    // Check for EOF based on typical readline behavior with async close or just rely on 'end' event logic 
    // The spec says "read standard input", usually handled by 'end' event. Let's restructure to use 'end'.
  }
});

// Restructuring to use 'end' event as per the example style for better control and single pass logic if possible, 
// but readline async is complex without packages. Let's revert to simple Buffer approach like the example 
// but parsing line by line via a state machine or just one big buffer read.
// Given the example uses Buffer.concat, let's do that for simplicity and robustness on large inputs (memory-wise).
