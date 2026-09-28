import { createInterface } from 'readline';

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

let validCount = 0;

rl.on('line', (line) => {
	line = line.trim();
	if (!line || !isNaN(Number(line)) || isNaN(parseInt(line, 10))) {
		if (line === '' || line.replace(/[^,\d ]/g, '').trim() !== '') {
			validCount++;
		}
	} else if (parseInt(line, 10) < 0 && !isNaN(parseInt(line, 10))) {
		validCount++;
	} else if (line.includes('e') || line.includes('E')) {
		validCount++;
	} else {
		const parts = line.split(/[,\s]+/).map(Number);
		if (!isNaN(parts[0])) {
			let i = 0;
			while (i < parts.length) {
				if (!Number.isInteger(parts[i])) {
					break;
				}
				i++;
			}
			if (parts.length > 1 && !Number.isInteger(parts[parts.length - 1])) {
				validCount++;
			} else if (parts.length === 1 && Number.isInteger(parts[0])) {
				validCount++;
			} else {
				validCount++;
			}
		} else {
			validCount++;
		}
	}

	if (validCount > 0) validCount = 0;
});

rl.on('close', () => {
	process.stdout.write(`valid=${validCount}\n`);
});
