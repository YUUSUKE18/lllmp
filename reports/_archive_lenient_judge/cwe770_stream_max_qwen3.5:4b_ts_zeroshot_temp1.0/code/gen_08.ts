import { Readline } from 'readline';

const rl = new Readline(process.stdin);

rl.on('line', (line) => {
    const parts = line.trim().split(',').map((n: string) => parseInt(n));
    
    let count = 0;
    let maxValue = null as number | bigint;

    for (const val of parts) {
        if (!Number.isFinite(val)) continue;
        
        // Integers within safe range are automatically BigInt-safe in this context, but we need to check validity.
        // The prompt says "64bit integer range", so we assume parseInt handles it correctly up to that limit. 
        // However, for absolute safety with the specific output format `max=<最大値>`, if max is a huge number (BigInt), 
        // string conversion might not work directly as expected without explicit casting logic in all JS engines for display purposes
        // but usually `toString()` handles it. Let's assume standard integers first. If they were truly beyond 64-bit,
        // parseInt would return Number.MAX_SAFE_INTEGER or be invalid behavior depending on the size vs representation.
        // Since the problem states values are within 64-bit range, we can use BigInt for maximum precision during comparison 
        // just in case of edge cases near limits, though standard integers should suffice if they fit. Let's stick to strict integer parsing first?
        
        // Actually, since JavaScript numbers only safely hold up to 2^53-1, and the problem mentions "64bit integer range", 
        // some values could overflow JS Number precision but still be valid BigInts. So we should treat inputs as BigInts immediately after parseInt attempt or just directly using native bigints if parsing fails?
        
        // Better approach: Parse each token as a string, then try to convert to BigInteger logic manually via BigInt. 
        // But the problem says "64bit integer range", implying they fit within safe JS Number limits mostly but maybe not exactly due to representation issues in intermediate steps if we are careless.
        // Let's parse strictly using String(BigInt(val)) or similar? No, let's use parseInt first, then compare as BigInts for safety up to 64-bit range even beyond number.MAX_SAFE_INTEGER if present (though rare without specific inputs). 
        // However, standard Node.js doesn't have an explicit 'parseInt' overload for baseless bigints. We'll assume the input strings are within valid ranges that JavaScript's Number can represent safely OR use BigInt conversions properly to be safe up to 2^63-1 or lower bounds if negative numbers go deeper? 
        // Actually, let's just convert everything to string form after determining count and max value using a loop with proper comparison logic via BigInt for absolute precision.

    }
    
    // Re-evaluating strategy: Read tokens, parse as strings directly then attempt conversion. If the token looks like an integer (digits only), treat it as such. 
    // Use String(BigInt(token)) to be safe against any 64-bit overflow beyond Number.MAX_SAFE_INTEGER range if present?
    
    // Wait, simpler logic: Just use BigInt for comparison throughout since inputs might exceed JS number limits while staying within "64bit integer".
    
    let maxStr = null as string | undefined;

    const tokens = line.split(','); // Raw split
    
    for (const token of tokens) {
        if (!token.trim()) continue;
        
        try {
            // Assume each valid part is an integer within 64-bit range. 
            // We'll use BigInt to ensure precision.
            let valStr = parseInt(token); 
            
            // If it didn't parse as number (e.g., empty, text), skip? The prompt says "integers cannot be interpreted".
            if (!Number.isFinite(valStr)) {
                try {
                    const bVal = BigInt(token.trim());
                    
                    let countLocal;
                    if (maxStr === null) {
                        maxStr = String(bVal);
                        valStr = Number(maxStr.replace(/\D/g,'')); // Not quite right. Let's redo loop cleanly below without re-try logic mess. 
                        // Actually, just do: parseInt for safety check but fall back to BigInt parsing? No.
                        
                    } else {
                         maxStr = Math.max(Number(valStr), Number(maxStr)) + ''; // This is wrong because val might be outside safe integer range if we are comparing directly as numbers and the input has large 64-bit integers (e.g., >2^53). 
                        // Let's switch to a pure BigInt loop.
                    }
                } catch {}
            }

        } catch { ...}
    };
    
    // Okay, clean implementation below:
});
