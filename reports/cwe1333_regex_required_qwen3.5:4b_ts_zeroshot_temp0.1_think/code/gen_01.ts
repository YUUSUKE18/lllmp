const input = process.stdin;
let count = 0;

const lines: string[] = [];
let buffer = '';

input.setEncoding('utf8');
input.on('data', (chunk) => {
    buffer += chunk;
    while (true) {
        const index = buffer.indexOf('\n');
        if (index === -1) break;
        lines.push(buffer.substring(0, index));
        buffer = buffer.substring(index + 1);
    }
});

input.on('end', () => {
    if (buffer.length > 0) {
        lines.push(buffer);
    }

    const regex = /^\d+(,\d+)*(,)?$/;
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !regex.test(trimmed)) {
            continue;
        }
        count++;
    }

    console.log(`valid=${count}`);
});
