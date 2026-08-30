import { createInterface } from "readline";

const rl = createInterface({ input: process.stdin, output: process.stdout });

let validCount = 0;

rl.on("line", (line) => {
	const trimmed = line.trim();

	if (trimmed.length === 0) {
		return;
	}

	if (!/^[,\d]+$/.test(trimmed)) {
		return;
	}

	const parts = trimmed.split(",");

	if (parts.every((p) => /^\d+$/.test(p))) {
		validCount++;
	}
});

rl.on("close", () => {
	process.stdout.write(`valid=${validCount}\n`);
});
