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
                    // Memoization is technically not strictly needed for 1, but we can store it.
                    memo.put(n, count);
                } else if (!memo.containsKey(n)) {
                    // Recursive calculation with memoization
                    long count;
                    if (n % 2 == 0) {
                        count = memo.getOrDefault(n / 2, -1);
                        if (count == -1) {
                            // If n/2 hasn't been calculated yet, calculate it recursively
                            long subCount = calculateSteps(n / 2, memo);
                            count = subCount + 1;
                        } else {
                            count = count + 1;
                        }
                    } else {
                        // n is odd: 3n + 1
                        long nextN = 3L * n + 1;
                        long subCount = calculateSteps(nextN, memo);
                        count = subCount + 1;
                    }
                    memo.put(n, count);
                } else {
                    // Already memoized
                    count = memo.get(n);
                }
                totalCount += count;

            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
            }
        }

        System.out.println("total=" + totalCount);
    }

    /**
     * Recursively calculates the number of steps to reach 1 from n, using memoization.
     * This function is designed to be called internally for recursive steps.
     * @param n The current number.
     * @param memo The memoization map.
     * @return The number of steps to reach 1 from n.
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
            // n is odd: 3n + 1
            result = calculateSteps(3 * n + 1, memo) + 1;
        }

        memo.put(n, result);
        return result;
    }
}
