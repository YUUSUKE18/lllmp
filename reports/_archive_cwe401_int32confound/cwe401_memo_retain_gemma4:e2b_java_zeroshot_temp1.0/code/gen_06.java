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
                    // Base case: n=1 requires 0 steps
                    long count = 0;
                    totalCount += count;
                    // Memoization is technically for n > 1, but we can store it for completeness if needed.
                    memo.put(n, count);
                } else if (!memo.containsKey(n)) {
                    // Recursive step with memoization
                    long count;
                    if (n % 2 == 0) {
                        count = memo.getOrDefault(n / 2, 0);
                    } else {
                        count = memo.getOrDefault(3 * n + 1, 0);
                    }

                    // The structure of the problem implies that the sequence always leads to 1,
                    // so we need to calculate the path cost. The problem asks for the number of steps
                    // to reach 1. This means the operation is:
                    // If n is even, n -> n/2
                    // If n is odd, n -> 3n+1
                    // and we count the steps taken.

                    // Re-evaluating the required calculation based on the standard Collatz-like interpretation:
                    // We are finding the number of steps to reach 1.
                    // n=1 -> 0 steps (already handled)
                    // n=2 -> 1 step (2/2=1)
                    // n=3 -> 7 -> 20 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (9 steps)
                    
                    // Since we are calculating the total number of steps for each initial query, 
                    // we need to calculate the path length recursively or iteratively from n to 1.

                    // Let's reset the memoization logic to store the required path length directly.
                    // We use a separate recursive function or iterative calculation if the structure allows.
                    
                    // Given the prompt structure, we should calculate the steps for the current n:
                    
                    long currentSteps = 0;
                    int current = n;
                    
                    // Use a set or iterative map for the path calculation to avoid deep recursion issues if we must use recursion, 
                    // but simple iteration is safest for this type of problem.
                    Map<Integer, Long> pathMemo = new HashMap<>();
                    pathMemo.put(1, 0L);
                    
                    // Since we are calculating for a single input n, we don't need to use the global memo 
                    // for the final answer if we process each input independently. 
                    // The requirement is "calculate the number of steps to reach 1".

                    // Let's stick to calculating the steps for THIS input n and add it to the total.

                    long steps = calculateSteps(n, pathMemo);
                    totalCount += steps;
                    
                    // Store the result for future use (memoization)
                    memo.put(n, steps);

                }
            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
            }
        }

        System.out.println("total=" + totalCount);
    }

    /**
     * Calculates the number of steps required to reach 1 from n using the Collatz-like rules.
     * Uses memoization internally for efficiency.
     */
    private static long calculateSteps(int n, Map<Integer, Long> memo) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long nextN;
        if (n % 2 == 0) {
            nextN = n / 2;
        } else {
            // Check for potential overflow if n is very large, although the problem constraints imply 64-bit result
            // and the input will likely fit within standard int range for this problem type.
            nextN = 3L * n + 1L;
        }

        // Recursive call + 1 step
        long steps = 1 + calculateSteps((int) nextN, memo);
        
        // Store result before returning
        memo.put(n, steps);
        return steps;
    }
}
