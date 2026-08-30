const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const memo = new Map<number, number>();
let totalSum = 0;
let lineCount = 0;

rl.on('line', (line) => {
  if (line.trim() === "") return;
  const n = parseInt(line.trim(), 10);
  if (!isNaN(n)) {
    let steps = 0;
    let current = n;

    while (current !== 1) {
      if (memo.has(current)) {
        // Memoization hit
        steps += memo.get(current);
        break;
      }

      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      steps++;
    }

    if (current === 1) {
      // If we reached 1, calculate the total steps for this query
      // Since we are calculating the steps from n to 1, we need to adjust the logic.
      // The problem asks for the number of steps to reach 1.
      // The sequence is the Collatz sequence.
      // We need to calculate the steps for the *current* n.

      // Let's re-evaluate the goal: find the number of steps to reach 1.
      // The operations are:
      // If n is even, n -> n/2
      // If n is odd, n -> 3n+1
      // Base case: steps(1) = 0
      // steps(n) = 1 + steps(n/2) if n is even
      // steps(n) = 1 + steps(3n+1) if n is odd

      // Since we are calculating the path *from* n *to* 1, we need to store the result for n.
      // We will use a recursive/iterative approach with memoization.

      // Resetting the calculation for clarity based on the standard Collatz problem structure.
      // We need to calculate the steps for the input n.
      
      // Since the input is streamed, we process each line as a separate query.
      // We will calculate the steps for the current n and add it to the total.
      
      // --- Recalculating the logic based on the requirement ---
      // The requirement is: "n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。"
      
      let current_n = n;
      let steps_to_one = 0;
      const path: number[] = []; // To store the path for memoization

      // Calculate the path to 1
      while (current_n !== 1) {
        if (memo.has(current_n)) {
          // If we hit a memoized value, we can use it.
          steps_to_one += memo.get(current_n);
          break;
        }
        
        path.push(current_n);
        
        if (current_n % 2 === 0) {
          current_n /= 2;
        } else {
          current_n = 3 * current_n + 1;
        }
      }
      
      if (current_n === 1) {
        // If we reached 1, calculate the total steps for this query
        // The number of steps is the length of the path (number of transitions) + 1 (if we count the start)
        // Or, more simply, the number of steps taken in the loop.
        
        // Since the loop terminates when current_n becomes 1, the number of iterations is the number of steps.
        // We need to count the steps taken in the loop.
        
        let calculated_steps = 0;
        let temp = n;
        while (temp !== 1) {
            if (temp % 2 === 0) {
                temp /= 2;
            } else {
                temp = 3 * temp + 1;
            }
            calculated_steps++;
        }
        
        // Store the result
        memo.set(n, calculated_steps);
        totalSum += calculated_steps;
      }
    }
  }
});

rl.on('close', () => {
  console.log(`total=${totalSum}`);
});
