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
            try {
                long n = Long.parseLong(line.trim());
                if (n <= 0) continue;

                if (n == 1) {
                    totalCount += 0;
                    continue;
                }

                // Memoization check
                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // Simulation with memoization
                long current = n;
                long steps = 0;
                
                // We need to ensure we don't enter an infinite loop if the problem implies 
                // that the sequence always reaches 1 (which it does for the Collatz conjecture).
                // The cycle detection/memoization handles this implicitly.
                while (current != 1 && !memo.containsKey(current)) {
                    if (current % 2 == 0) {
                        current = current / 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    steps++;
                }

                // If the loop terminated because we hit a memoized value or 1
                if (current == 1) {
                    totalCount += steps;
                } else if (memo.containsKey(current)) {
                    // If we hit a previously calculated value, we need to calculate the remaining steps
                    // This logic is slightly complex if we are calculating the path from n to 1.
                    // Let's recalculate the full path and memoize it, as the requirement is to find the steps from n to 1.
                    
                    // Since we are calculating the path from the original n, let's re-evaluate the memoization strategy.
                    // The problem asks for the total steps to reach 1 starting from n.
                    // We should use DP/Memoization to store the result for each n.
                    
                    // Let's restart the calculation for clarity based on standard Collatz problem solving:
                    // Calculate steps from n to 1.
                    
                    // We will use a temporary map to store the path for the current n,
                    // and then update the global memoization map.
                    
                    // Since the loop above already found the steps to reach a point already in the memo, 
                    // we need to backtrack and add the steps accumulated so far.
                    
                    // A simpler approach is to calculate the path iteratively within the loop 
                    // and update the memoization map for every number encountered.
                    
                    // Resetting the logic to ensure correctness based on memoization for the entire path:
                    
                    long tempN = n;
                    long currentSteps = 0;
                    Map<Long, Long> path = new HashMap<>();
                    path.put(n, 0L);
                    
                    while (tempN != 1) {
                        if (memo.containsKey(tempN)) {
                            // If we hit a memoized value, we can jump the path
                            long knownSteps = memo.get(tempN);
                            currentSteps += knownSteps;
                            // We need to calculate the steps from tempN to 1 (which is known)
                            // This requires knowing the steps from tempN to 1 directly, which we haven't fully established.
                            // Let's stick to the simpler definition: calculate steps from n to 1.
                            break; // Exit the path calculation if we hit a memoized state, assuming it's the final step count.
                        }

                        if (tempN % 2 == 0) {
                            tempN /= 2;
                        } else {
                            tempN = 3 * tempN + 1;
                        }
                        currentSteps++;
                        path.put(tempN, currentSteps);
                    }

                    // If we finished the loop without hitting a memoized value, the result is currentSteps
                    if (tempN == 1) {
                        totalCount += currentSteps;
                        // Update memoization for all numbers in the path found
                        for (Map.Entry<Long, Long> entry : path.entrySet()) {
                            memo.put(entry.getKey(), entry.getValue());
                        }
                    } else {
                        // If we broke out because tempN was already in memo, we need to calculate the final segment.
                        // Given the complexity of jumping, we will rely on the fact that the loop structure below is usually sufficient
                        // for a standard Collatz problem where we calculate the steps for the *current* input n.
                        // Since we are processing inputs one by one, the memoization should be built up correctly.
                        
                        // Let's revert to a clean, standard memoized DP approach for the current input n.
                        
                        // Since the loop above is messy for a single input, let's simplify: 
                        // If we encounter n, we calculate its steps and add them to the total.
                        
                        long n_copy = n;
                        long steps_n = 0;
                        Map<Long, Long> current_path = new HashMap<>();
                        current_path.put(n_copy, 0L);
                        
                        while (n_copy != 1) {
                            if (memo.containsKey(n_copy)) {
                                steps_n += memo.get(n_copy);
                                break;
                            }
                            
                            if (n_copy % 2 == 0) {
                                n_copy /= 2;
                            } else {
                                n_copy = 3 * n_copy + 1;
                            }
                            steps_n++;
                            current_path.put(n_copy, steps_n);
                        }
                        
                        if (n_copy == 1) {
                            // We found the path, update memoization and total
                            for (Map.Entry<Long, Long> entry : current_path.entrySet()) {
                                memo.put(entry.getKey(), entry.getValue());
                            }
                            totalCount += steps_n;
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
