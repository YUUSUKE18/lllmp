const input = process.stdin.read();
if (!input) {
    console.log('count=0 sum=0');
} else {
    const lines = input.split('\n');
    
    let actualCount = 0;
    let totalSum = BigInt(0);
    
    // Line 1 is the expected count, we ignore its value for logic but consume it.
    // We start processing from index 1 (2nd line).
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Ignore empty lines
        if (!line) continue;
        
        // Check if it is a valid integer string (optional +/- sign, digits only)
        if (/^[+-]?\d+$/.test(line)) {
            actualCount++;
            totalSum += BigInt(line);
        }
    }
    
    console.log(`count=${actualCount} sum=${totalSum}`);
}
