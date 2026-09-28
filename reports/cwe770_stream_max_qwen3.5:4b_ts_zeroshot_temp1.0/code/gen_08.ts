const readline = require('readline');

rl.on('data', (data) => {
	const input = data.toString().trim();
	if (!input.trim()) {
		console.log(`count=0 max=`);
		return;
	}

	let parts: string[] | null = null;
	try {
		parts = input.split(',').map((s) => parseInt(s.trim(), 10)).filter((n): n is number => !isNaN(n));
		if (!parts || parts.length === 0) {
			console.log(`count=0 max=`);
			return;
		}

		const count = parts.length;
		let max = Number.MIN_SAFE_INTEGER;
		
		for (const num of parts) {
			if (num > max) {
				max = num as number;
			}
		}

		console.log(`count=${count} max=${max}`);
	} catch (_) {}
});

rl.on('close', () => null);

process.stdin.setEncoding('utf8');
