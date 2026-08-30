import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        Map<Integer, Long> memo = new HashMap<>();

        while (true) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) {
                continue;
            }

            try {
                int n = Integer.parseInt(line.trim());
                if (n <= 0) {
                    continue;
                }

                if (n == 1) {
                    // Base case: n=1, count is 0
                    long count = 0;
                    totalCount += count;
                    // Memoize result for 1
                    memo.put(1, count);
                } else {
                    // Recursive step
                    long count = 0;
                    int currentN = n;
                    
                    // Path tracking for cycle detection (though for this problem it seems to converge fast, memoization handles it)
                    // Since the problem asks for the number of steps to reach 1, we follow the path.
                    // We use the memoization map to store results.
                    
                    // Iterative simulation with memoization
                    // We need to find the number of steps from n to 1.
                    // The problem asks for the steps to reach 1 from n using the operations.
                    // The sequence is: n -> n/2 (if even) or 3n+1 (if odd).
                    
                    // Let's re-read the goal: "n が 1 のときの手数は 0 です。" and "1 に到達するまでの手数を求めます。"
                    // This implies we need to count the operations.
                    
                    // Since we are using memoization, we calculate the steps from n to 1.
                    // If we are calculating steps from n, we recursively call for the next state.
                    
                    // To prevent infinite recursion if we don't handle the cycle detection correctly in a pure recursive structure,
                    // we ensure we only rely on the memoized values.
                    
                    // Let's use a loop to simulate the process, counting steps, and using memoization for efficiency.
                    
                    long steps = 0;
                    int current = n;
                    
                    // Path to 1, tracking steps
                    // To use memoization effectively for the path length, we usually compute the path from the start.
                    // The memoization should store the total steps found so far for a number.
                    
                    // We need to be careful about the order of updates and memoization.
                    
                    // A simpler, direct recursive approach with memoization is often cleanest for this type of problem.
                    
                    // We will implement a helper function for clarity, but since we must fit it into the main loop structure,
                    // we'll embed the logic or use a slightly modified approach.
                    
                    // Since the operations (n/2 or 3n+1) are related to the Collatz conjecture,
                    // we assume the process terminates at 1.
                    
                    // Re-initialize memo map for this number if we were doing a standalone function, but here we use the global one.
                    
                    // Let's perform the calculation iteratively until 1 is reached, tracking steps.
                    
                    // Since we need to calculate the path length for *every* input, and we are supposed to use memoization,
                    // we check the memo table first.
                    
                    // If n is already computed, use it.
                    if (memo.containsKey(n)) {
                        count = memo.get(n);
                    } else {
                        // Calculate the steps iteratively for the current n
                        // To avoid re-calculating subproblems that might be in the process, we must trust the memoization mechanism.
                        
                        // Since we are computing the path length to 1, we can use the iterative process directly.
                        
                        // To correctly handle memoization in a sequence where we compute the path length,
                        // we need to find the path length from N to 1.
                        
                        // Given the constraints, let's stick to the iterative path finding as it naturally computes the path length.
                        
                        // Re-calculating the path length for n:
                        int tempN = n;
                        long steps_n = 0;
                        
                        // Path tracking for cycle detection (optional but good practice)
                        // Map<Integer, Long> currentPath = new HashMap<>(); // Not strictly needed if we trust convergence.

                        while (tempN != 1) {
                            if (memo.containsKey(tempN)) {
                                // If we hit a memoized value, we can jump ahead.
                                steps_n += memo.get(tempN);
                                break;
                            }
                            
                            if (tempN % 2 == 0) {
                                tempN /= 2;
                            } else {
                                tempN = 3 * tempN + 1;
                            }
                            steps_n++;
                        }
                        
                        // If the loop exited because tempN reached 1, we need to update all intermediate states.
                        // This is complex because we are calculating the *total* steps, not just the steps from N.
                        
                        // Let's revert to the standard DP/Memoization approach where memo[n] stores the steps from n to 1.
                        
                        // Clear the previous attempt and reset the calculation for n:
                        
                        // We will use a local recursive function approach for clarity, relying on memoization.
                        
                        long result = calculateSteps(n, memo);
                        count = result;
                        memo.put(n, result);
                    }
                }
                
                totalCount += count;

            } catch (NumberFormatException e) {
                // Ignore non-integer input
            }
        }

        System.out.println("total=" + totalCount);
    }
    
    // Helper function to calculate steps from n to 1, using memoization
    private static long calculateSteps(int n, Map<Integer, Long> memo) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long result;
        if (n % 2 == 0) {
            // n/2
            result = 1 + calculateSteps(n / 2, memo);
        } else {
            // 3n+1
            result = 1 + calculateSteps(3 * n + 1, memo);
        }

        memo.put(n, result);
        return result;
    }
}
