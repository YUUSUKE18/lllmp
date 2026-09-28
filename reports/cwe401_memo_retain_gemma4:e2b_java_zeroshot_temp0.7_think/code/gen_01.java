import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {

    /**
     * Given a starting number n, calculates the number of steps required to reach 1
     * using the Collatz sequence rules (n/2 if even, 3n+1 if odd).
     * Uses memoization to store results.
     *
     * @param n The starting number (must be >= 1).
     * @param memo The map used for memoization.
     * @return The number of steps to reach 1.
     */
    private static long countSteps(long n, Map<Long, Long> memo) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long current = n;
        long steps = 0;

        // Iteratively apply the Collatz rules
        while (current != 1) {
            if (current % 2 == 0) {
                // n is even: n/2
                current = current / 2;
            } else {
                // n is odd: 3n + 1
                // Note: Since inputs can lead to large numbers (64-bit range), 
                // we must ensure 3n+1 calculation stays within long limits.
                current = 3 * current + 1;
            }
            steps++;
        }

        // Memoize the result before returning
        memo.put(n, steps);
        return steps;
    }

    public static void main(String[] args) throws IOException {
        // Use BufferedReader for efficient input reading
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // Memoization map: stores number -> steps
        Map<Long, Long> memo = new HashMap<>();
        long totalSum = 0;

        String line;
        
        // Read input line by line
        while ((line = br.readLine()) != null) {
            // Ignore empty lines
            if (line.trim().isEmpty()) {
                continue;
            }
            
            try {
                long n = Long.parseLong(line.trim());

                // Process the query only if n >= 1
                if (n >= 1) {
                    // Calculate steps using the memoized function
                    long steps = countSteps(n, memo);
                    totalSum += steps;
                }
            } catch (NumberFormatException e) {
                // Ignore lines that cannot be parsed as integers
                continue;
            }
        }

        // Output the final result in the required format
        System.out.println("total=" + totalSum);
    }
}
