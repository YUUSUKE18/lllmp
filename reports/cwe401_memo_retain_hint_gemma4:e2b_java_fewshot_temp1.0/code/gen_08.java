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

                if (!memo.containsKey(n)) {
                    // Calculate steps using memoization (or dynamic programming logic)
                    long current = n;
                    long steps = 0;
                    // We need a way to store the path to avoid recomputing subproblems effectively.
                    // Since the problem asks for the number of steps to reach 1,
                    // we can use a recursive approach with memoization, or iteratively trace the path.

                    // Since we are calculating the steps for *each* query independently based on the initial n,
                    // and the sequence is deterministic, we just need to find the steps for this specific n.
                    // The standard problem (Collatz conjecture sequence) is about the number of steps from n to 1.

                    // Let's use a helper function/logic for the steps calculation for a single n, and memoize the result for n.
                    
                    // For this specific problem structure (reading Ns sequentially and summing the results):
                    // The problem statement is slightly ambiguous: "各クエリ n について、n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。"
                    // This implies we calculate the sequence length for the input N.
                    
                    // To satisfy the memoization requirement, we calculate the steps for n.
                    
                    long tempN = n;
                    long stepsForN = 0;
                    Map<Long, Long> pathMemo = new HashMap<>(); // Memoization for the current trajectory calculation

                    while (tempN != 1) {
                        if (pathMemo.containsKey(tempN)) {
                            // Cycle detected or already calculated in this path context, which shouldn't happen if we always go to 1.
                            // In the Collatz sequence, cycles only occur if 1 is not reachable, but for this problem context, we assume reachability to 1.
                            break;
                        }
                        
                        pathMemo.put(tempN, stepsForN);
                        
                        if (tempN % 2 == 0) {
                            tempN /= 2;
                        } else {
                            tempN = 3 * tempN + 1;
                        }
                        stepsForN++;
                    }
                    
                    // If tempN reached 1, pathMemo.get(n) holds the steps.
                    if (tempN == 1) {
                        totalCount += stepsForN;
                        memo.put(n, stepsForN);
                    }
                    // If the sequence does not reach 1 (which is assumed not to happen for standard inputs), we ignore it or handle error based on strict requirements.
                } else {
                    // Use memoized result
                    totalCount += memo.get(n);
                }

            } catch (NumberFormatException e) {
                // Ignore lines that are not integers
            }
        }

        System.out.println("total=" + totalCount);
    }
}
