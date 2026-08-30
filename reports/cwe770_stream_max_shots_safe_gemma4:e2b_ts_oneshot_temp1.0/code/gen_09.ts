import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (input === "") {
        process.stdout.write("count=0 max=0\n");
        return;
    }

    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // Check if it's a valid integer representation and within 64-bit range conceptually (though JS numbers handle large integers up to 2^53 safely for bitwise operations, we check the spirit of the requirement)
        if (!isNaN(num)) {
            // We assume standard JS safe integer limits are sufficient for typical contest inputs unless explicitly dealing with BigInt.
            // Since the prompt implies standard integer reading and outputting a 64-bit range value, we proceed with standard numbers.
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    if (count === 0) {
        // If no valid integers were found, count is 0 and max is undefined. We default max to 0 if we must output a number.
        process.stdout.write(`count=0 max=0\n`);
    } else {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    }
}

solve();
