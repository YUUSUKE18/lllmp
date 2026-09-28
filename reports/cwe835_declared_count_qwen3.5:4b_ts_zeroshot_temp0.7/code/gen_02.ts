import { readFileSync } from "fs";

const input = readFileSync(0, "utf-8");

const lines = input.trim().split(/\r?\n/);

let count = 0;
let sum = BigInt(0);

for (const line of lines) {
  if (line === "") continue;
  
  const parts = line.split(/\s+/).filter(p => p.length > 0);
  
  for (const part of parts) {
    if (!/^-?\d+$/.test(part)) continue;
    
    const num = BigInt(part);
    sum += num;
    count++;
  }
}

process.stdout.write(`count=${count} sum=${sum}\n`);
