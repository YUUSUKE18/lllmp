import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        Map<Long, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    totalCount += 0;
                    continue;
                }

                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // Calculate steps using memoization and cycle detection (implicit via memoization structure)
                // Since the problem asks for the steps to reach 1, and the operation is the Collatz conjecture rules,
                // the sequence must eventually reach 1 for any starting positive integer.
                // We use a temporary map or explicit tracking for the current path to detect cycles if the problem allowed
                // non-convergent sequences, but since it asks for steps *to* 1, standard memoization is sufficient.

                long current = n;
                long steps = 0;
                
                // Path tracking for cycle detection is more robust if we were unsure about convergence,
                // but here we rely on the fact that if we hit a memoized value, we stop.
                // We will calculate the path step by step until we hit a known value or 1.
                
                // To handle the actual path calculation efficiently, we simulate the path.
                // We must be careful not to re-calculate the entire sequence for intermediate steps if we don't memoize the whole path.
                // The standard approach for Collatz is to compute the path explicitly.

                // Let's re-think the requirement: "n が 1 に到達するまでの手数を求めます。"
                // We need the steps for *this* n, and then sum them up.

                // Resetting the calculation for the current N
                current = n;
                steps = 0;
                
                // Use a temporary map to store the path for the current computation to handle potential cycles 
                // or long sequences before hitting a memoized value.
                Map<Long, Long> path = new HashMap<>();
                path.put(current, 0L);
                
                boolean cycleDetected = false;
                
                while (current != 1 && !memo.containsKey(current)) {
                    if (current % 2 == 0) {
                        current = current / 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    steps++;

                    if (path.containsKey(current)) {
                        // Cycle detected, this shouldn't happen if we rely strictly on the Collatz conjecture convergence to 1,
                        // but as a safety measure, if we loop, we stop calculation for this specific path segment.
                        // Since the problem implies convergence, this path should lead to a memoized value eventually.
                        cycleDetected = true;
                        break; 
                    }
                    path.put(current, steps);
                }
                
                // If we reached 1 or a memoized value
                if (current == 1) {
                    // Calculate the total steps for this n by backtracking the stored path or by re-calculating cleanly.
                    // Since we only stored the path in 'path', we need to retrieve the step count to 1.
                    // The length of the path is the steps taken.
                    // The steps calculated above (`steps`) is the total number of operations to reach `current`.
                    
                    // If current == 1, steps is the required number of operations.
                    long finalSteps = steps;
                    
                    // We need to sum up the steps for this N.
                    totalCount += finalSteps;
                    memo.put(n, finalSteps);

                } else if (memo.containsKey(current)) {
                    // We hit a previously calculated value. Use that result.
                    long stepsToCurrent = path.get(current);
                    long stepsToN = stepsToCurrent + (steps - stepsToCurrent); // This logic is complicated if we don't store total steps correctly.
                    
                    // Simpler approach: If we hit a memoized value, we use it directly.
                    long knownSteps = memo.get(current);
                    // The steps to reach N is the steps to reach 'current' + steps taken from 'current' to 'N'.
                    // Since we are calculating N -> ... -> current, and current is known, we add the steps recorded in the path.
                    totalCount += knownSteps + (steps - path.get(current)); // Still tricky.
                    
                    // RETHINK: Let's stick to the simple memoization structure where the result *is* the total steps to 1.
                    // If we reach a known state 'current', the steps for 'n' are steps_to_current + steps_from_current_to_1.
                    
                    // The simplest way for Collatz: calculate the full path and memoize the result.
                    // Since we already calculated up to the point where we hit a known value, we must ensure we calculate the full result for N.
                    
                    // Let's discard the path map and just let the recursion/iteration handle the memoization naturally.
                    // Re-implementing the core calculation focusing only on the result for N.
                    
                    // Since the problem states to handle 32bit/64bit, we trust the numbers won't overflow standard long for the steps.
                    
                    long result = calculateSteps(n, memo);
                    totalCount += result;
                    memo.put(n, result);
                }

            } catch (NumberFormatException e) {
                // Ignore lines that are not integers
            }
        }

        // Final output
        System.out.println("total=" + totalCount);
    }

    // Helper function for the core calculation with memoization
    private static long calculateSteps(long n, Map<Long, Long> memo) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long current = n;
        // We need a separate mechanism for cycle detection within this specific path calculation 
        // if we were concerned about non-convergence or extremely long chains that don't hit memoization quickly.
        // For standard Collatz, we just follow the path until we hit a memoized value or 1.
        
        // To prevent infinite loops in case the input is malicious (though context implies Collatz):
        // We use a safety limit, although standard competitive programming problems assume convergence.
        long safetyLimit = 1000000000L; // Arbitrary large safety limit

        // To detect simple loops within the current path calculation (in case of a cycle not leading to 1, though mathematically unsound here)
        // A simple path set for cycle detection during this specific calculation.
        java.util.Set<Long> path = new java.util.HashSet<>();
        path.add(current);

        long steps = 0;
        
        while (current != 1) {
            if (steps > safetyLimit) {
                // Should not happen for valid Collatz sequences
                // Handle error or break, but for this problem, assume it converges.
                break; 
            }
            
            if (current % 2 == 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
            
            if (current == 1) break;

            // Check memoization before continuing the loop
            if (memo.containsKey(current)) {
                // If we hit a memoized value, the total steps is: steps taken so far + steps from the memoized value.
                // Since memoized value is the steps to 1, we need to adjust.
                long stepsTo1 = memo.get(current);
                return steps + stepsTo1;
            }

            // Check for cycles within the current path calculation
            if (path.contains(current)) {
                // Cycle detected, stop this calculation. This implies an issue or a cycle in the state space we are traversing.
                // Since the problem requires reaching 1, we treat this as an error or stop.
                return -1; // Indicate failure/cycle if necessary
            }
            
            path.add(current);
        }

        if (current == 1) {
            // If we reached 1 successfully within the loop
            memo.put(n, steps);
            return steps;
        }
        
        // If we exited the loop without reaching 1 (e.g., due to safety limit or cycle detection which we treat as failure)
        return -1; 
    }
}
