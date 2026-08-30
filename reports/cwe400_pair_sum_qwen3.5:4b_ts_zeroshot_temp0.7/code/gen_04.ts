const input = process.stdin;

input.setEncoding("utf8");
let buffer = "";

input.on("data", (chunk) => {
	buffer += chunk;
	if (!buffer.endsWith("\n")) return;
	processLine(buffer.trim());
});

function processLine(line: string): void {
	const trimmed = line.trim();
	if (trimmed === "") return;

	const target = parseInt(trimmed, 10);
	if (isNaN(target)) return;

	input.once("data", () => {}); // Ensure the rest of the stream is processed if needed, though usually stdin ends after data.

	const numbers: number[] = [];

	input.on("data", (chunk) => {
		const newLine = chunk.trim();
		if (!newLine || newLine === "") return;
		
		const val = parseInt(newLine, 10);
		if (!isNaN(val)) {
			numbers.push(val);
		}
	});

	let count = 0;
	
	for (let i = 0; i < numbers.length - 1; i++) {
		for (let j = i + 1; j < numbers.length; j++) {
			if (numbers[i] + numbers[j] === target) {
				count++;
			}
		}
	}

	console.log(`pairs=${count}`);
}

if (buffer.endsWith("\n")) processLine(buffer.trim());
