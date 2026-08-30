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

                // Check memoization
                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // Calculate steps using memoization (Floyd's cycle-finding/memoization idea is implicitly used here by recursion structure)
                // Since we are calculating the steps to reach 1, we can use recursion with memoization.
                long steps = calculateSteps(n, memo);
                
                // Store result and update total
                memo.put(n, steps);
                totalCount += steps;

            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
            }
        }

        System.out.println("total=" + totalCount);
    }

    /**
     * Calculates the number of steps to reach 1 from n using the specified operations.
     * Uses memoization to store results.
     * @param n The starting number.
     * @param memo The map for memoization.
     * @return The number of steps.
     */
    private static long calculateSteps(long n, Map<Long, Long> memo) {
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
            // n is odd: 3n + 1
            result = calculateSteps(3 * n + 1, memo) + 1;
        }

        memo.put(n, result);
        return result;
    }
}
