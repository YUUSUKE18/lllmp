const line = process.stdin.readline().trim();
if (line.length === 0) process.exit(0);
const countStr = parseInt(line, 10);
const inputs: number[] = [];
while (true) {
	const l = process.stdin.readline();
	if (l === null || l.trim() === '') break;
	const nums = l.split(/\s+/).filter(s => /^\d+$/.test(s));
	inputs.push(...nums.map(Number));
}
const count = inputs.length;
const sum = inputs.reduce((acc, val) => acc + val, 0);
console.log(`count=${count} sum=${sum}`);
