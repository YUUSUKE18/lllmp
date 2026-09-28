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
                if (n < 1) {
                    continue;
                }

                if (n == 1) {
                    // Base case: n=1, count is 0
                    long count = 0;
                    totalCount += count;
                    // Memoization is not strictly necessary for 1, but good practice
                    memo.put(1, 0L);
                } else if (!memo.containsKey(n)) {
                    // Recursive step with memoization
                    long count;
                    if (n % 2 == 0) {
                        count = memo.getOrDefault(n / 2, -1L) + 1;
                    } else {
                        count = memo.getOrDefault(3 * n + 1, -1L) + 1;
                    }
                    
                    // Since we are calculating the steps *to* 1, we need to adjust the logic.
                    // The problem asks for the number of steps to reach 1.
                    // Let f(n) be the steps from n to 1.
                    // f(1) = 0
                    // f(n) = 1 + f(n/2) if n is even
                    // f(n) = 1 + f(3n+1) if n is odd
                    
                    // Let's re-evaluate the memoization structure to fit the recursive definition correctly.
                    // Since we are calculating the total sum, we can use a recursive function with memoization.
                    // Since the input is streamed, we must calculate the result for each input.
                    
                    // Let's restart the calculation logic to use a recursive helper if necessary, 
                    // or ensure the iterative approach handles the required sum correctly.
                    
                    // Given the constraints, a direct recursive calculation for each input might be too slow if the sequence is long,
                    // but since the problem asks for the *sum* of steps, we must calculate it for each input.
                    
                    // We will use a recursive function with memoization for the step count for each query.
                    // Since we are reading input sequentially, we calculate the result for 'n' and add it to totalCount.
                    
                    // To avoid re-calculating the entire path for every query, we calculate the steps for the current n.
                    
                    // --- Recursive calculation for steps to 1 ---
                    
                    // We need a separate function or structure for this, as the iterative loop structure doesn't naturally support the recursive calls easily within the loop context without re-reading or complex state management.
                    // Since the input is a stream of queries, we process each query independently.
                    
                    // We will use a helper function approach.
                    
                    // Since the provided structure requires a single output based on the input stream, 
                    // and the memoization must be used across queries, we must calculate the steps for the current 'n'.
                    
                    // Let's stick to the iterative calculation for now, assuming the memoization is for the *path* calculation.
                    
                    // If n is not memoized, calculate it:
                    if (!memo.containsKey(n)) {
                        // This part is tricky because the standard iterative approach is usually for finding the single max/sum.
                        // For this problem, we need the path length for *each* input n.
                        
                        // Since the problem asks for the sum of steps for *all* queries, we must calculate the steps for the current n.
                        
                        // We will calculate the steps for n using a recursive helper function that updates the memoization table.
                        long steps = calculateSteps(n, memo);
                        totalCount += steps;
                    } else {
                        // If memoized, use the stored value
                        totalCount += memo.get(n);
                    }
                    
                }
            } catch (NumberFormatException e) {
                // Ignore non-integer lines
            }
        }

        System.out.println("total=" + totalCount);
    }

    /**
     * Calculates the number of steps to reach 1 from n, using memoization.
     * @param n The starting number.
     * @param memo The memoization table.
     * @return The number of steps.
     */
    private static long calculateSteps(int n, Map<Integer, Long> memo) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long result;
        if (n % 2 == 0) {
            // n is even: n/2
            result = calculateSteps(n / 2, memo) + 1;
        } else {
            // n is odd: 3n+1
            result = calculateSteps(3 * n + 1, memo) + 1;
        }

        memo.put(n, result);
        return result;
    }
}
