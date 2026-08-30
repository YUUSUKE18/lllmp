import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;
        Map<Long, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            try {
                long n = Long.parseLong(line.trim());
                if (n == 1) {
                    // Base case: n=1 takes 0 steps
                    // Memoization is not strictly needed for 1, but good practice.
                    memo.put(1L, 0L);
                } else if (!memo.containsKey(n)) {
                    // Calculate steps using recursion with memoization
                    long steps = calculateSteps(n, memo);
                    memo.put(n, steps);
                }

                // Process the query n
                long currentN = n;
                long stepsForN = 0;
                // We only calculate the steps for the current n, not the total accumulated steps based on the problem description.
                // The problem asks for the total number of steps required by the sequence of transformations starting from each query.

                // Since the problem description implies a sequence of transformations for *each* query n to reach 1:
                // "各クエリ n について、n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。"
                
                // We need to calculate the steps for the *current* n.
                // The actual state to track is the path length from n to 1.
                
                // Let's re-read the requirement: "n が 1 のときの手数は 0 です。"
                // We need to find the number of steps to reach 1 starting from the initial n.

                // The transformation rule is:
                // if n is even: n -> n/2
                // if n is odd: n -> 3n+1
                
                // The goal is to find the number of operations to reach 1.
                
                long steps = 0;
                long current = n;
                while (current != 1) {
                    if (current % 2 == 0) {
                        current /= 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    steps++;
                }
                totalSteps += steps;

            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
            }
        }

        System.out.println("total=" + totalSteps);
    }

    /**
     * Calculates the number of steps required to transform n to 1 using the Collatz-like rules.
     * This function is mainly illustrative of the logic derived from the problem statement.
     * Since we are calculating the steps for each input separately and summing them, 
     * we implement the direct simulation for each input rather than relying on the typical
     * recursive structure of the Collatz problem unless the optimization requirement implies
     * that the sequence of transformations must be memoized across multiple calls to find the path length.
     * Given the context of "All queries' total steps", direct simulation per query is most straightforward.
     */
    private static long calculateSteps(long n, Map<Long, Long> memo) {
        // Since the main loop already performs the simulation and summation, this helper
        // is not strictly necessary for the final output logic derived above, but we keep the structure clean.
        // If the requirement was to find the steps for a single N, this would be the function.
        
        // For the final solution structure based on reading all lines and summing the steps:
        // The simulation is already embedded in the main loop above.
        return 0; // Placeholder, actual calculation is done in main.
    }
}
