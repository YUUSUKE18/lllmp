const input = process.stdin.read().trim();
if (!input) {
    console.log('count=0 sum=');
} else {
    const nums = input.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
    const uniqueNums = [...new Set(nums)];
    let count = uniqueNums.length;
    let sum = 0n; // Use BigInt to ensure safety, though spec says fits in 64-bit.
    for (const n of uniqueNums) {
        if (!Number.isFinite(n)) continue;
        const bigN = BigInt(n);
        sum += bigN;
    }
    console.log(`count=${count} sum=${sum}`); // Output format requires string representation, but spec implies standard integer types. Since input fits 64-bit int range per unique elements logic? Wait, "合計は 64bit 整数の範囲に収まります" means the SUM fits in 64-bit signed/unsigned integer. So BigInt is safe to compute and convert back or just print string.
    // Re-reading spec: "合計は 64bit 整数の範囲に収まります". This guarantees that even if we sum unique numbers, it won't overflow a standard JS Number (which is double precision) unless the input itself was maliciously crafted to exceed safe integer limits before summation? 
    // Actually, JavaScript Numbers are doubles. Integers up to 2^53 - 1 are exact. If inputs are large integers but their *sum* fits in 64-bit range (signed or unsigned?), we should be careful.
    // "64bit integer" usually implies signed 64-bit int (-9e18 to +9e18). JS Number max safe is ~9e15. 
    // However, if the problem guarantees the SUM fits in a standard C++ long long or similar (signed), we might have precision issues with JS Numbers for intermediate steps?
    // Let's use BigInt for absolute safety as it handles arbitrary precision and prints correctly. The output format `sum=<value>` will show the full value.
}
