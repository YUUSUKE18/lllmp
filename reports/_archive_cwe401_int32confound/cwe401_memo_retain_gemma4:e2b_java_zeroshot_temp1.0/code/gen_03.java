import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        Map<Integer, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                int n = Integer.parseInt(line.trim());

                if (n == 1) {
                    // Base case: n=1 takes 0 steps
                    long count = 0;
                    totalCount += count;
                    // Memoize the result for n=1
                    memo.put(n, count);
                } else if (!memo.containsKey(n)) {
                    // Calculate steps for n using memoization (the Collatz sequence)
                    long steps = 0;
                    int current = n;
                    
                    // We must calculate the path to 1 for the current n.
                    // The problem asks for the number of steps to reach 1.
                    // Since we are dealing with a sequence, we trace it until we hit a known value (or 1).
                    // However, the standard interpretation of "number of steps to reach 1" in Collatz problems
                    // usually means the length of the sequence until 1 is reached.

                    // Since the operations are n -> n/2 (if even) or n -> 3n+1 (if odd), 
                    // we apply these operations repeatedly.

                    // To handle repeated values efficiently, we follow the sequence.
                    // Since the sequence can be very long, memoization is crucial.
                    // We use a temporary map/recursion approach to find the total steps for n.

                    // Since we are calculating the steps for a single query n, we don't need to store
                    // the entire path in the memo map for intermediate steps, only the final result for the query.
                    
                    // Let's re-evaluate the memoization strategy. We need the steps for the *initial* n.
                    // The Collatz conjecture states that *every* positive integer will eventually reach 1.
                    // We are calculating the sequence length for each input n.

                    // Recursive calculation with memoization for a single number n:
                    long tempSteps = 0;
                    int currentN = n;
                    // Path tracking to detect cycles (though Collatz is conjectured to terminate)
                    // Since we are guaranteed to reach 1, we don't strictly need cycle detection for correctness, 
                    // but it prevents infinite loops if the conjecture were false for some input.

                    // We will calculate the sequence step by step.
                    // Since we memoize, we can use the memo table to jump.
                    
                    // The standard Collatz problem counts the steps.
                    // 1 -> 0 steps
                    // 4 -> 2 (1 step) -> 1 (2 steps)
                    // 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (7 steps)

                    // Let's calculate the sequence explicitly:
                    while (currentN != 1) {
                        if (memo.containsKey(currentN)) {
                            // Found a known path segment
                            long stepsFromKnown = memo.get(currentN);
                            tempSteps += stepsFromKnown;
                            break;
                        }
                        
                        if (currentN % 2 == 0) {
                            currentN /= 2;
                        } else {
                            // 3n + 1. Need to check if 3n+1 is memoized before adding to the sequence.
                            // We must continue the process.
                            currentN = 3 * currentN + 1;
                        }
                        tempSteps++;
                    }
                    
                    // If we reached 1 without hitting a memoized value during the trace (only possible if the trace starts at n and only hits unmemoized values until 1), 
                    // we need to account for the final step to 1.
                    if (currentN == 1) {
                        // If the loop terminated because currentN reached 1, tempSteps is the correct count.
                        memo.put(n, tempSteps);
                    } else if (!memo.containsKey(n)) {
                         // If we stopped because we hit an existing memoized value, the total steps is:
                         // steps taken to reach that value + steps from that value to 1 (which is already stored).
                         // Since the loop structure above is complex to handle memoization correctly mid-trace for the total count,
                         // let's simplify the calculation for the specific query n, ensuring we use the memoization correctly.
                         
                         // Reset and perform a clean, simple calculation based on the memoization:
                         
                         int start = n;
                         long count = 0;
                         int currentVal = start;
                         
                         // Use a stack/list to store the path to detect if we are re-calculating parts unnecessarily, 
                         // but since we only memoize the final result, a simple trace with lookups is better.
                         
                         // Since we must calculate the path for 'n', let's trace it fully, assuming the memo table holds the *final* answer for any number encountered.
                         
                         // Rerun the trace, trusting the memoization principle:
                         currentVal = n;
                         long currentPathSteps = 0;
                         
                         // Temporary set to detect immediate, non-converging cycles during this specific calculation (optional, but safe)
                         // Since we expect convergence, we rely on the assumption.
                         
                         while (currentVal != 1) {
                             if (memo.containsKey(currentVal)) {
                                 // We hit a known value. Add its known steps and stop.
                                 currentPathSteps += memo.get(currentVal);
                                 break;
                             }
                             
                             if (currentVal % 2 == 0) {
                                 currentVal /= 2;
                             } else {
                                 currentVal = 3 * currentVal + 1;
                             }
                             currentPathSteps++;
                         }
                         
                         if (currentVal == 1) {
                             // If we reached 1, and it was the end, currentPathSteps is the total.
                             memo.put(n, currentPathSteps);
                         }
                    }
                }
                
                // After calculation, add the result for this query to the total
                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                }


            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
            }
        }

        // Output the final result
        System.out.println("total=" + totalCount);
    }
}
