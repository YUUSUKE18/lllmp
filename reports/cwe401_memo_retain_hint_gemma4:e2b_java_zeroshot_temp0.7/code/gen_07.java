import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
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
                    long steps = 0;
                    totalCount += steps;
                    // Memoization is not strictly necessary for n=1 if we handle it here, 
                    // but we can store it.
                    memo.put(n, steps);
                } else if (!memo.containsKey(n)) {
                    // Calculate steps for n
                    long current = n;
                    long steps = 0;
                    // Use a temporary set or recursion to detect cycles if necessary, 
                    // but for this problem, the sequence is known to converge to 1 (Collatz conjecture).
                    // We rely on the memoization to handle cycles/revisits efficiently.
                    while (current != 1) {
                        if (memo.containsKey(current)) {
                            // Cycle detected, should not happen if Collatz conjecture holds and we are moving towards 1.
                            // If it happens, we stop to prevent infinite loop.
                            break; 
                        }
                        
                        if (current % 2 == 0) {
                            current /= 2;
                        } else {
                            // 3n + 1. Since intermediate values can be large, we ensure long arithmetic.
                            current = 3 * current + 1;
                        }
                        steps++;
                    }
                    
                    // If the loop terminated because current reached 1 or we hit a memoized value
                    if (current == 1 || memo.containsKey(current)) {
                        // Calculate the total steps for the current path, including memoized parts
                        long pathSteps = steps;
                        // Backtrack and add memoized steps
                        long temp = n;
                        while (temp != 1) {
                            if (memo.containsKey(temp)) {
                                pathSteps += memo.get(temp);
                                temp = 1; // Stop tracing the path if we hit a known value
                            } else {
                                // Recalculate the steps for the remaining unknown segment (which should be small if we are careful)
                                // Since we are doing iterative calculation, we just need to ensure the result is stored.
                                // Let's simplify the logic: calculate the full path iteratively and memoize at each step.
                                break; 
                            }
                        }
                        
                        // Restarting the calculation for simplicity and correctness of memoization:
                        // If we reached 1 or a memoized number, record the total steps for n.
                        long calculatedSteps = 0;
                        long tempN = n;
                        Map<Long, Long> pathMemo = new HashMap<>();
                        pathMemo.put(1L, 0L);
                        
                        boolean cycleDetected = false;
                        while (tempN != 1) {
                            if (pathMemo.containsKey(tempN)) {
                                cycleDetected = true;
                                break;
                            }
                            
                            if (tempN % 2 == 0) {
                                tempN /= 2;
                            } else {
                                tempN = 3 * tempN + 1;
                            }
                            pathMemo.put(tempN, pathMemo.get(tempN) + 1);
                        }
                        
                        if (!cycleDetected) {
                            // If we reached 1, the steps are in pathMemo.get(1)
                            memo.put(n, pathMemo.get(1));
                            totalCount += pathMemo.get(1);
                        }
                    }
                }
            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
            }
        }

        System.out.println("total=" + totalCount);
    }
}
