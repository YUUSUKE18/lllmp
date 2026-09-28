import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();

if (!input) {
    console.log('count=0 sum=0');
} else {
    const tokens = input.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
    
    if (tokens.length === 0) {
        console.log('count=0 sum=0');
    } else {
        const uniqueValues = new Set<number>(tokens);
        
        let count = uniqueValues.size;
        let sum = 0n; // Use BigInt to prevent overflow during accumulation, though spec says final fits in 64-bit
        
        for (const val of uniqueValues) {
            if (!Number.isInteger(val)) continue; 
            const bigVal = BigInt(Math.abs(Number(val)));
            
            // Check sign and add absolute value first then apply sign logic or just use signed arithmetic carefully.
            // Since input is integer, we can safely cast to number for sum calculation as spec guarantees result fits in 64-bit int range (approx +/-9e18). 
            // However, intermediate sums might exceed if not careful? No, final sum fits in 64-bit signed integer implies it won't overflow during accumulation unless the numbers themselves are huge but few.
            // Let's use BigInt for safety and then convert to number at end or keep as string representation of count/sum logic. 
            // Actually simpler: accumulate using Number if we trust input range, else use BigInt.
            
            sum += val;
        }

        console.log(`count=${count} sum=${Number(sum)}`);
    }
}
