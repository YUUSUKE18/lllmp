import { strict as assert } from 'assert';

const memo = new Map<number, number>();

const processLine = (line: string): number => {
  if (memo.has(line)) return memo.get(line);

  if (line === "1") return 0;
  if (line.endsWith("1")) return processLine(line.slice(0, -1)) + 1;

  const n = parseInt(line, 10);
  const next = n % 2 === 0 ? n / 2 : 3 * n + 1;

  memo.set(line, processLine(next));
  return memo.get(line);
};

const sum = (...lines: string[]): number => lines.reduce((acc, line) => acc + processLine(line), 0);

const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\n/).filter(line => line.trim() !== "");
  const total = sum(...lines);
  console.log(`total=${total}`);
});
