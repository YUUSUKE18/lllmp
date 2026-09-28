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

        while (true) {
            String line = br.readLine();
            if (line == null) break;

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

                // Calculate the steps for n
                long current = n;
                long steps = 0;
                // Use a temporary map for path calculation to detect cycles if necessary,
                // but for this specific problem (Collatz conjecture), we assume convergence to 1.
                // We will use the memoization approach directly.
                
                // Path tracing for the current query
                Map<Long, Long> path = new HashMap<>();
                long temp = n;
                long stepCount = 0;
                
                while (temp != 1) {
                    if (path.containsKey(temp)) {
                        // Cycle detected, should not happen for Collatz sequence leading to 1
                        // Treat as an error or stop, but for Collatz, we assume it terminates.
                        break; 
                    }
                    path.put(temp, stepCount);
                    
                    if (temp % 2 == 0) {
                        temp = temp / 2;
                    } else {
                        temp = 3 * temp + 1;
                    }
                    stepCount++;
                }
                
                // If we reached 1, the steps are stepCount.
                if (temp == 1) {
                    // Memoize the result for the starting number n
                    memo.put(n, stepCount);
                    totalCount += stepCount;
                } else {
                    // If the loop broke unexpectedly (cycle or non-convergence), 
                    // we handle it based on the problem context. Assuming valid Collatz steps.
                    // If we strictly follow the rule, we must ensure we don't re-calculate invalid paths.
                    // For simplicity and adherence to the standard problem, we assume convergence.
                    // If the implementation requires strict path finding for memoization, 
                    // the path map would be used.
                }

            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
            }
        }

        System.out.println("total=" + totalCount);
    }
}
