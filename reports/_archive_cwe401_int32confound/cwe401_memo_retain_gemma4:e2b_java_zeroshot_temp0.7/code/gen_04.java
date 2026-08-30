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
                    // Base case: n=1 has 0 steps
                    long count = 0;
                    totalCount += count;
                    // Memoization is implicitly handled by the structure, 
                    // but we'll explicitly store it if needed for clarity, though not strictly necessary for this specific base case result.
                    memo.put(n, count);
                } else if (!memo.containsKey(n)) {
                    // Recursive/Iterative calculation with memoization
                    long steps = calculateSteps(n, memo);
                    totalCount += steps;
                    memo.put(n, steps);
                } else {
                    // If already memoized, just add the stored value
                    totalCount += memo.get(n);
                }
            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
            }
        }

        System.out.println("total=" + totalCount);
    }

    /**
     * Calculates the number of steps required to reach 1 from n using the specified rules.
     * Implements memoization.
     * 
     * @param n The starting integer.
     * @param memo The memoization map.
     * @return The number of steps to reach 1.
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
