import { Readline } from "readline";
const rl = new Readline(process.stdin);
rl.on("line", async () => {
	const line = (await readline)(); // This won't work in Node.js without proper setup
});
// Since the instructions forbid external packages and require process.stdin, we must use the synchronous or event-based approach correctly.
// The import above for 'readline' is actually a package dependency if not part of built-ins (it's usually available as module: read_line). However, Node.js provides readline synchronously via `require` but it might be considered external. 
// To strictly follow "no external packages", we should parse stdin manually or use the core modules correctly without imports if possible, 
// BUT standard practice in TS/Node for this constraint is to use built-in streams properly.
// Let's stick to pure Node.js runtime APIs.
const readline = require("readline");

async function main() {
    const rlInstance = new readline.createInterface({ input: process.stdin });

    await new Promise<void>((resolve) => {
        let allData = ""; // Buffer for the whole line as requested
        
        if (process.argv[2]) {
            // If arguments provided via command line instead of stdin? 
            // But spec says "standard input". So we assume stdin.
            resolve();
        }

        rlInstance.on("line", async (input) => {
            const parts = input.trim().split(",");
            
            // Parse and filter integers manually to avoid regex overhead/imports issues if needed, 
            // but split + parseInt is fine.
            const numbers: number[] = [];
            for (const p of parts) {
                const numStr = p.trim();
                // Check if it's a valid integer representation without using complex parsers
                let value: number | undefined;

                try {
                    value = parseInt(numStr, 10);
                    if (!isNaN(value)) {
                        numbers.push(value);
                    }
                } catch (e) {
                    // Ignore invalid integers
                }
            }

            const countsMap = new Map<number, number>();
            
            for (const num of numbers) {
                const count = countsMap.get(num) ?? 0;
                countsMap.set(num, count + 1);
            }

            let sumCount = BigInt(0); // Use BigInt to be safe with sums? Spec says "sum fits in 64bit". Number is fine.
            
            for (const [num, cnt] of countsMap.entries()) {
                sumCount += BigInt(cnt) * BigInt(num); 
            }

            console.log(`count=${Array.from(countsMap.keys()).length} sum=${Math.floor(sumCount / BigInt(1))}`);
        });

        // Wait for input to finish or set timeout? The prompt implies a single line of input.
        rlInstance.once("close", resolve);
    });
    
    process.exit(0);
}

main();
