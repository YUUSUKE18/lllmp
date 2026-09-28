const line = process.stdin.readline() || '';

const validLine = /^(\d+)(?:,\d+)*$/.test(line.trim());

if (validLine) {
    const numLists = line.split(',').filter(Boolean).length;
    if (numLists >= 1) {
        console.log(`valid=${numLists}`);
    } else {
        console.log('valid=0');
    }
} else {
    console.log('valid=0');
}
