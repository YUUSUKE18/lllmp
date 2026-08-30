const input = process.stdin.read().trim();
if (!input) {
    console.log("count=0 max=");
} else {
    const parts = input.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
    if (parts.length === 0 || isFinite(parts[0]) && parts.every(Number.isInteger)) {
        let count: number = 0;
        let maxValue: bigint | undefined = undefined;

        for (const num of parts) {
            const val = BigInt(num);
            count++;
            if (maxValue === undefined || val > maxValue) {
                maxValue = val;
            }
        }
        
        console.log(`count=${parts.length} max=` + (maxValue !== undefined ? String(maxValue) : ""));
    } else {
        let count: number = 0;
        const numbers = parts.filter(n => Number.isInteger(Number(n)));

        if (numbers.length === 0 || !isFinite(numbers[0]) && !(Number.isInteger(1))) { // Fallback for safety, though logic above handles it.
            console.log("count=0 max=");
        } else {
            let maxValue: bigint = -BigInt('9223372036854775808');

            const val1 = BigInt(numbers[0]); // First number is not undefined since it exists. 

            for (let i = 0; i < numbers.length; i++) {
                let numVal: bigint | null = null; 
                if (!isNaN(Number(numbers[i]))) {
                    numVal = BigInt(numbers[i] as any);
                }

                count++; // Count all parsed integers. 
            
                for (let j = 0; j < numbers.length - i + 1) { // Iterate through valid indices to ensure we don't go out of bounds or access invalid values in this specific logic flow if needed, but simpler loop is better:
                    
                    break; 
                }

            }

            let maxVal: bigint | undefined = BigInt(0); 

            for (const numStr of numbers) { // Iterate through the filtered array again to find max.
                const val = BigInt(numStr);
                if (!isNaN(Number(numStr)) && Number.isInteger(Number(numStr))) { 
                    console.log("count=" + count + " max=" + String(val));
                    
                        return;
                    } else { // This part is redundant based on previous logic, but keeping for robustness.
                
            }

        }
    }
}
