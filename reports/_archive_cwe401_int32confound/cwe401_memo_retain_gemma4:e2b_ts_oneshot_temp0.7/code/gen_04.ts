const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log("total=0");
        return;
    }

    const lines = input.split(/\s+/).filter(line => line.length > 0);
    let totalCount = 0n;
    const memo = new Map<number, bigint>();

    for (const line of lines) {
        const n = parseInt(line, 10);
        if (isNaN(n) || n < 1) continue;

        if (n === 1) {
            // Base case: 1 requires 0 steps
            continue;
        }

        if (memo.has(n)) {
            totalCount += memo.get(n);
            continue;
        }

        // Recursive step based on parity
        let steps;
        if (n % 2 === 0) {
            steps = 1 + solve(n / 2);
        } else {
            steps = 1 + solve(3 * n + 1);
        }

        // We need a way to calculate the total sum across all queries,
        // but the problem asks for the number of steps *for each query* and then the *sum* of those steps.
        // The recursive structure here naturally calculates the steps for a single starting number,
        // but we need to accumulate the total for *all* initial inputs.

        // Since the input is a sequence of queries, we process them sequentially.
        // The problem statement implies that the input stream contains multiple independent queries.
        // Let's re-read the specification: "標準入力に、1 以上の整数が 1 行に 1 個ずつ並びます（クエリ）。"
        // "すべてのクエリの手数の合計を求めます。"

        // We need a function that calculates steps(n) and accumulates the result.
        // Since the implementation must be self-contained and handle the input stream,
        // we'll adapt the structure to process the input lines sequentially as queries.
        // The memoization should be applied to the recursive calculation.

        // To avoid infinite recursion/stack overflow if the problem implies a structure where
        // the input itself defines the sequence of calls, we need a wrapper approach.
        // Given the context of typical competitive programming problems using this structure,
        // the input stream contains the sequence of numbers to process.

        // Let's restart the logic assuming the input is a sequence of starting numbers n_i.
        // We will use a separate recursive function for calculation and memoization.
    }

    // --- Corrected approach based on standard interpretation of this type of problem ---

    // Since we need to calculate the sum of steps for *all* input numbers,
    // we'll redefine the process to handle the input stream as queries.

    const queries = lines.map(Number);
    totalCount = 0n;
    const memo_final = new Map<number, bigint>();

    function calculateSteps(n: number): bigint {
        if (n === 1) {
            return 0n;
        }
        if (memo_final.has(n)) {
            return memo_final.get(n)!;
        }

        let steps;
        if (n % 2 === 0) {
            steps = 1 + calculateSteps(n / 2);
        } else {
            steps = 1 + calculateSteps(3 * n + 1);
        }

        memo_final.set(n, steps);
        return steps;
    }

    for (const n of queries) {
        if (n >= 1) {
            totalCount += calculateSteps(n);
        }
    }

    console.log(`total=${totalCount.toString()}`);
}

// Since the environment expects a single block execution, we need to ensure the execution is triggered correctly.
// In a standard Node environment reading from stdin, the logic above needs to be wrapped.
// Since the provided example uses Buffer reading, we adhere to that pattern for robustness,
// although the final implementation will use synchronous reading for simplicity if possible,
// or stick strictly to the provided input reading mechanism.

// Reverting to the provided structure pattern (reading from stdin stream)
// and ensuring the final output format is met.

function finalSolve() {
    let inputData = '';
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', (data) => {
        inputData += data;
    });

    process.stdin.on('end', () => {
        const lines = inputData.split(/\s+/).filter(line => line.length > 0);
        let totalCount = 0n;
        const memo = new Map<number, bigint>();

        function calculateSteps(n: number): bigint {
            if (n === 1) {
                return 0n;
            }
            if (memo.has(n)) {
                return memo.get(n)!;
            }

            let steps;
            if (n % 2 === 0) {
                steps = 1 + calculateSteps(n / 2);
            } else {
                steps = 1 + calculateSteps(3 * n + 1);
            }

            memo.set(n, steps);
            return steps;
        }

        for (const line of lines) {
            const n = parseInt(line, 10);
            if (!isNaN(n) && n >= 1) {
                totalCount += calculateSteps(n);
            }
        }

        console.log(`total=${totalCount.toString()}`);
    });
}

finalSolve();
