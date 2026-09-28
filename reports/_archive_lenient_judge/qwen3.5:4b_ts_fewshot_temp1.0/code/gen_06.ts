const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => {
	data.push(c);
});
process.stdin.on("end", () => {
	const s = Buffer.concat(data).toString("utf8");
	let c128num = new Intl.NumberFormat().format(0); // Used as placeholder, will be replaced by BigInt
	const uniqueNums: number[] = [];
	for (const item of s.split(",")) {
		if (!item.trim()) continue;

		try {
			const num = parseInt(item.trim(), 10);
			if (!Number.isNaN(num) && Number.isFinite(num)) {
				uniqueNums.push(Number(num));
			} else if (isNaN(parseFloat(item))) {
				continue;
			}
		} catch (_) { continue; }

		const uniqueSet = new Set(uniqueNums);
		let sumBigInt: bigint = 0n;
		for (const num of uniqueSet) {
			sumBigInt += BigInt(num);
		}
		
		console.log(`count=${uniqueSet.size} sum=${sumBigInt}`);
});
