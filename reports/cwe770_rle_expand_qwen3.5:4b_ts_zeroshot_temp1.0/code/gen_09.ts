import * as readline from 'readline';

const rl = readline.createInterface({
	inputType: 'stdin'
});

rl.on('line', line => {
	if (!line.trim()) return;
	
	const parts = line.split(',');
	let count = 0;
	let sum = BigInt(0);
	
	for (const part of parts) {
		part = part.trim();
		if (!part) continue;
		
		const [value, repeat] = part.split(':');
		if (!value || !repeat) continue;
		
		const v = parseInt(value, 10);
		const r = parseInt(repeat, 10);
		
		if (isNaN(v) || isNaN(r)) continue;
		if (r < 0) continue;
		
		count += r;
		sum += BigInt(v) * BigInt(r);
	}
	
	console.log(`count=${Number(count)} sum=${Number(sum)}`);
});
