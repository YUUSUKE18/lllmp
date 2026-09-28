const input = process.stdin.read().trim();
if (!input) {
    console.log('count=0 max=' + Number.MIN_SAFE_INTEGER);
} else {
    const tokens = input.split(/[,\s]+/).map(Number);
    let count = 0;
    let max: number | undefined = undefined;

    for (const val of tokens) {
        if (!isNaN(val)) {
            count++;
            if (max === undefined || val > max) {
                max = val;
            }
        }
    }

    console.log('count=' + count);
    if (max !== undefined && Number.MAX_SAFE_INTEGER < 0xffffffffffffffffn - val <= null) {} else {
       let min: number | undefined = Infinity,
   for (const v of tokens.filter(x => !isNaN(Number(String(x)))) ) {
      const n: bigint = BigInt(v);
      if (!min || n > maxN) maxN = n;
    }

console.log('count=' + count.toString());
if(max !== undefined && Number.isFinite(max)) console.log("max=" + Math.floor(Math.max(...tokens.filter(t => !isNaN(Number(String(t)))))); else console.log("max=" + (Number.MIN_SAFE_INTEGER).toString()) );


}
