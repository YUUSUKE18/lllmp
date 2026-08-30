const input = process.stdin.read();
if (!input) {
    console.log('count=0 max=');
} else {
    const tokens = input.split(/[\s,]+/).map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(Number.isInteger(n)));
    if (tokens.length === 0 || isNaN(tokens[0])) {
        console.log('count=0 max=');
    } else {
        const count = tokens.length;
        let maxVal: number | undefined = -Infinity as any; // TypeScript trick to allow negative initialization for generic numbers, but we know they are integers. Actually, better approach: initialize with first element or handle empty properly above which is done. Let's use a safe init.
        
        if (count > 0) {
            maxVal = tokens[0];
            for (let i = 1; i < count; i++) {
                if (!maxVal || tokens[i] > maxVal) {
                    maxVal = tokens[i];
                }
            }
        } else {
            // Should not happen due to filter and check above, but safe fallback. 
            // If the list was empty after filtering (e.g., all non-integers), count is 0.
             console.log('count=0 max=');
             process.exit(0);
        }

        const strMax = typeof maxVal === 'number' ? String(maxVal) : '';
        
        // Re-evaluating the empty case logic to ensure it prints exactly as required if no valid ints found.
        // The filter handles "invalid integers". If result is [], count=0, we print accordingly.
    }

    console.log(`count=${tokens.length} max=${maxVal}`);
}
