const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    crlfDelay: Infinity
});

const memo: Map<number, number> = new Map();
let total_count = 0;

rl.on('line', (line) => {
    if (line.trim() === "") return;

    const n = parseInt(line.trim(), 10);

    if (isNaN(n)) return;

    if (n === 1) {
        // Base case: 1 に到達するまでの手数は 0
        if (!memo.has(1)) {
            memo.set(1, 0);
        }
        // このクエリが1の場合、手数は0なので合計に加算
        total_count += 0;
        return;
    }

    // Memoization check
    if (memo.has(n)) {
        total_count += memo.get(n);
        return;
    }

    // Recursive step
    let steps;
    if (n % 2 === 0) {
        steps = (n / 2) + memo.get(n / 2)!;
    } else {
        steps = (3 * n + 1) + memo.get(3 * n + 1)!;
    }
    
    // Since the problem asks for the total number of steps to reach 1 from n,
    // the calculation should be: steps_from_n = 1 + steps_from_next_number.
    // Let's re-read the goal: "n が 1 のときの手数は 0 です。"
    // The operation is:
    // if n is even: n -> n/2
    // if n is odd: n -> 3n+1
    // We want the number of steps to reach 1.
    
    // Let f(n) be the number of steps from n to 1.
    // f(1) = 0
    // f(n) = 1 + f(n/2) if n is even
    // f(n) = 1 + f(3n+1) if n is odd
    
    // Since we are only interested in the total sum, and we are asked to use memoization,
    // we should calculate f(n) and add it to the total sum.
    
    // Let's recalculate based on the standard Collatz problem interpretation (which this resembles)
    // The problem statement implies we are calculating the path length to 1.
    
    // Re-implementing the calculation based on the recursive definition:
    let current_n = n;
    let steps_to_one = 0;
    const path: number[] = [];

    while (current_n !== 1) {
        path.push(current_n);
        if (current_n % 2 === 0) {
            current_n /= 2;
        } else {
            current_n = 3 * current_n + 1;
        }
    }
    // The number of steps is the length of the path minus 1 (since the first element is n, and the last is 1)
    // The number of operations performed is the length of the path excluding the starting number n, plus 1 if we count the starting number itself as a step.
    // Standard interpretation: number of operations to reach 1.
    // If n=3: 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1. (7 steps)
    // Let's stick to the recursive memoization structure, as it is usually faster if the path is long.

    // Reverting to the pure memoized calculation:
    if (!memo.has(n)) {
        let result = 0;
        let temp_n = n;
        const stack: number[] = []; // To store the path for reconstruction if needed, but for sum we just need the value.

        // Standard Collatz step counting:
        while (temp_n !== 1) {
            if (memo.has(temp_n)) {
                result += memo.get(temp_n);
                break;
            }
            stack.push(temp_n);
            if (temp_n % 2 === 0) {
                temp_n /= 2;
            } else {
                temp_n = 3 * temp_n + 1;
            }
        }
        
        // This iterative approach seems to calculate the sum of steps from n down to 1, but we need to update memo for all encountered numbers.
        // Let's simplify: calculate f(n) only, and add it to total_count.
        
        // Let's use a simpler recursive memoization approach for f(n)
        const calculate_f = (k: number): number => {
            if (k === 1) return 0;
            if (memo.has(k)) return memo.get(k)!;

            let next_val: number;
            if (k % 2 === 0) {
                next_val = k / 2;
            } else {
                next_val = 3 * k + 1;
            }

            const result = 1 + calculate_f(next_val);
            memo.set(k, result);
            return result;
        };
        
        const steps_for_n = calculate_f(n);
        total_count += steps_for_n;
    } else {
        // If we reached here via the initial check, we already calculated it.
        total_count += memo.get(n)!;
    }
});

rl.on('close', () => {
    console.log(`total=${total_count}`);
});
