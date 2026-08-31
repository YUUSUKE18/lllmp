const input = process.stdin.read();
let count = 0;
let sum = BigInt("0");

for (const line of input.split('\n')) {
	if (!line.trim()) continue;
	const parts = line.match(/\d+/g);
	if (parts) {
		for (const part of parts) {
			count++;
			sum += BigInt(part);
		}
	}
}

console.log(`count=${count} sum=${sum}\n`);
