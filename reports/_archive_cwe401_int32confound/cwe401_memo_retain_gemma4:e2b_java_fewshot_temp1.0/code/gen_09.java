import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;
        Map<Integer, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            try {
                int n = Integer.parseInt(line.trim());

                if (n == 1) {
                    // Base case: 1 に到達するまでの手数は 0
                    // 今回は、n から 1 への手数を求めるため、memo には n=1 の結果を格納する必要がある。
                    // ただし、この問題は「n から 1 への手数」を求めるのではなく、「n が 1 に到達するまでの手数」を求める問題として解釈する。
                    // 通常のCollatz問題では n から 1 へのステップ数を数える。
                    // ここでは、n が 1 になるまでの操作回数を数える。
                    memo.put(n, 0L);
                } else if (!memo.containsKey(n)) {
                    // Calculate steps for n
                    long current = n;
                    long steps = 0;
                    // Since we are only interested in the total sum, and the problem states "n が 1 のときの手数は 0 です。",
                    // we need to calculate the steps for each query and sum them up.
                    // The memoization should store the steps to reach 1 from n.
                    
                    // Reset calculation for the current query n
                    long tempN = n;
                    long count = 0;
                    Map<Integer, Long> path = new HashMap<>();
                    path.put((int)tempN, 0L);
                    
                    while (tempN != 1) {
                        if (tempN % 2 == 0) {
                            tempN /= 2;
                        } else {
                            tempN = 3 * tempN + 1;
                        }
                        count++;
                        // Check if we encounter a previously computed value to avoid recomputing the entire path from that point
                        if (path.containsKey((int)tempN)) {
                            long stepsFromTempN = path.get((int)tempN);
                            long totalSteps = count + stepsFromTempN;
                            
                            // Update all values encountered in this path for memoization (this is slightly complex for simple memoization,
                            // better to use a forward calculation if we don't want to calculate the full path for every n, but since
                            // we need the sum of steps, standard memoization on the target n is fine if we ensure it's correct.)
                            // For simplicity and correctness regarding the Collatz sequence, we will use a direct calculation here,
                            // and use the map only to store the final result for the initial n.
                            break; // Stop calculation if we hit a memoized value (should not happen often if we use it correctly)
                        }
                        path.put((int)tempN, count);
                    }
                    
                    if (tempN == 1) {
                        long finalSteps = count;
                        totalSteps += finalSteps;
                        memo.put(n, finalSteps);
                    } else {
                        // This case should theoretically not be reached for positive integers unless an infinite loop is detected or we missed something.
                        // Given the problem constraints, we assume termination to 1.
                    }
                }
            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
            }
        }

        System.out.println("total=" + totalSteps);
    }
}
