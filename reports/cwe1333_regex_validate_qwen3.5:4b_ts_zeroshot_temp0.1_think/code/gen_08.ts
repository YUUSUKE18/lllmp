const input = process.stdin;
let count = 0;
let buffer = '';

input.setEncoding('utf8');

input.on('data', (chunk) => {
    buffer += chunk;
});

input.on('end', () => {
    const lines = buffer.split('\n');
    
    for (const line of lines) {
        const trimmed = line.trim();
        
        if (trimmed.length === 0) {
            continue;
        }

        // Check regex: starts with digit, then optional comma+digit groups, optionally ends with comma.
        // Ensures only digits and commas are present.
        if (/^[0-9]+(,[0-9]+)*[,]?/.test(trimmed)) {
            count++;
        }
    }

    console.log(`valid=${count}`);
});
