let total = 0n;
const memo = new Map<number, number>();

process.stdin.on("data", (c: Buffer) => {
  const line = c.toString().trim();
  if (line.length === 0) return;

  const n = parseInt(line, 10);
  if (Number.isNaN(n) || n < 1) return;

  let current = n;
  let steps = 0;

  while (current !== 1) {
    if (memo.has(current)) {
      // Memoization: If we hit a previously calculated value, we can use the stored result.
      // However, since the problem asks for the *total* steps across *all* queries,
      // and the recursion/iteration structure implies we are calculating the steps for *this* query,
      // we need to ensure memoization is applied correctly.
      // Since the memoization is based on the starting number 'n', we should only memoize the result for 'n'.
      // Let's adjust the approach to calculate the steps for the current n, and then add it to the total.
      // The memoization should be applied to the intermediate steps of the transformation if we were solving a single path,
      // but here we are solving the sequence of steps from n to 1.
      // Since the transformation is deterministic (Collatz-like), memoizing the result for the current 'current' value is the correct path.
      
      // If we are in a cycle or a known path, we can use memoization.
      // For this specific problem structure (calculating steps for a single starting number n),
      // we memoize the result for the current intermediate value.
      
      if (memo.has(current)) {
        steps += memo.get(current);
        break;
      }
    }

    if (current === 1) {
      steps += 0; // Base case: 1 takes 0 steps from itself
      break;
    }

    // Apply transformation
    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
    steps++;
  }

  // Store the result for the initial query n
  // Note: The requirement is to find the steps from n to 1.
  // The loop above calculates the steps *from* n *to* 1.
  // We need to handle the memoization carefully. Since we are calculating the steps for *one* input n,
  // the memoization is most effective if we are calculating the steps for *all* numbers encountered across *all* queries.

  // Let's re-read the requirement: "各クエリ n について、n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。"
  // This implies a standard Collatz sequence step counting.

  // Resetting the calculation to focus on the required output format:
  // We are calculating the steps for a single query n, and adding it to the total.
  // The memoization is for speeding up the calculation for repeated numbers.

  // --- Recalculate Steps for current n ---
  let steps_for_n = 0;
  let temp_n = n;
  const path: number[] = []; // To store the path for memoization if needed, but we only need the count.

  while (temp_n !== 1) {
    if (memo.has(temp_n)) {
      // If we hit a memoized number, we can jump ahead.
      // This logic is tricky because we need the total steps from the *original* n.
      // If memo[x] stores the steps from x to 1, then:
      steps_for_n += memo.get(temp_n);
      break;
    }

    if (temp_n === 1) {
        // Should have been caught by the loop condition, but for safety
        break;
    }

    // Store the current number before transformation to ensure we count the step correctly
    path.push(temp_n);

    if (temp_n % 2 === 0) {
      temp_n /= 2;
    } else {
      temp_n = 3 * temp_n + 1;
    }
    steps_for_n++;
  }
  
  // If the loop finished without hitting a memoized value, we calculate the steps directly.
  if (temp_n === 1) {
      // If we reached 1, the steps_for_n calculated inside the loop is correct.
      // We need to add the steps from the path we took, which is implicitly counted by steps_for_n.
      // The initial loop logic was flawed for direct accumulation. Let's stick to the standard iterative counting:
      
      let current_val = n;
      let steps_count = 0;
      const path_for_memo = [n];

      while (current_val !== 1) {
          if (memo.has(current_val)) {
              steps_count += memo.get(current_val);
              break;
          }
          
          if (current_val % 2 === 0) {
              current_val /= 2;
          } else {
              current_val = 3 * current_val + 1;
          }
          steps_count++;
          path_for_memo.push(current_val);
      }
      
      // If we reached 1 directly, steps_count is the answer.
      if (current_val === 1) {
          total += BigInt(steps_count);
          // Update memoization for all numbers encountered in this path
          for(const val of path_for_memo) {
              // We need to calculate the steps from 'val' to 1 if we are to memoize it correctly for future use.
              // This requires a recursive/iterative memoization setup that solves the whole problem, not just one path accumulation.
              // Given the constraint, the simplest interpretation is: if 'n' is repeated, use the stored result for 'n'.
              // Since the problem asks for the *total* sum, we only memoize the results calculated for the initial inputs.
              
              // For simplicity and adherence to the single output format, we will only memoize the result for the input 'n' itself
              // if we were to process multiple queries. Since we process them sequentially from stdin, we must calculate the steps for 'n' now.
          }
      }
  }
  
  // --- Final attempt based on standard interpretation of repeated application (Collatz) ---
  // We reset the calculation to be a pure iterative step count for the current input n, and update the global total.
  
  let current_n = n;
  let steps_for_n_final = 0;
  const path_to_memo = [n];

  while (current_n !== 1) {
      if (memo.has(current_n)) {
          steps_for_n_final += memo.get(current_n);
          break;
      }
      
      if (current_n % 2 === 0) {
          current_n /= 2;
      } else {
          current_n = 3 * current_n + 1;
      }
      steps_for_n_final++;
      path_to_memo.push(current_n);
  }
  
  if (current_n === 1) {
      total += BigInt(steps_for_n_final);
      // Memoize the result for the original input 'n'
      memo.set(n, steps_for_n_final);
  }
});

process.stdin.on("end", () => {
  // Output the final total
  console.log(`total=${total.toString()}`);
});
