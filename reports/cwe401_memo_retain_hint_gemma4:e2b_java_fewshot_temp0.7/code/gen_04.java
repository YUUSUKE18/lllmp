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
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(trimmedLine);
                
                if (n == 1) {
                    totalSteps += 0;
                    continue;
                }

                // Memoization check
                if (memo.containsKey(n)) {
                    totalSteps += memo.get(n);
                    continue;
                }

                // Calculate steps using memoization (and cycle detection implicitly handled by memoization if we detect cycles, 
                // but for this specific problem, the sequence eventually reaches 1, so direct recursion/iteration with memoization is fine)
                
                long current = n;
                long steps = 0;
                
                // Use a temporary set/map for cycle detection if needed, but since the problem implies reaching 1, 
                // we rely on the property that the sequence converges to the 4-1 cycle (8, 13, 21, 34, 55, 89, ...), 
                // or the 1 -> 4 -> 2 -> 1 cycle for the standard Collatz conjecture behavior if we only consider the steps to 1.
                // However, the problem asks for the steps to reach 1.
                
                // Standard Collatz sequence steps calculation
                while (current != 1) {
                    if (memo.containsKey(current)) {
                        // Cycle detected. If we hit a previously calculated number, 
                        // we need to handle the cycle path. Since we are calculating the *total* steps 
                        // for *this* query, if we hit a cycle, we need to adjust.
                        // For this specific problem (Collatz sequence to 1), the cycle is 4 -> 2 -> 1, but the sequence is n/2 or 3n+1.
                        // We simply follow the path until 1. If we re-encounter a value during this path, 
                        // it implies we are in a loop that doesn't reach 1 (if the standard conjecture is false) or 
                        // we are just looping through the known sequence.
                        // Since we are looking for the steps to 1, and we memoize, if we hit a memoized value, 
                        // we can use that result to finish the count.
                        
                        // For simplicity and speed, we assume the standard problem constraints where the sequence 
                        // eventually reaches 1, and the memoization handles the total time.
                        // If we hit a memoized value, it means the total steps from that point onward are known.
                        steps += memo.get(current);
                        break; // Path resolved via memoization
                    }
                    
                    if (current % 2 == 0) {
                        current /= 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    steps++;
                }
                
                // If the loop exited because current == 1, we have found the steps.
                if (current == 1) {
                    totalSteps += steps;
                    memo.put(n, steps);
                } else {
                    // This case should ideally not be reached if the Collatz conjecture holds and we handle cycles properly.
                    // If we entered the loop and exited without reaching 1 (e.g., infinite loop detected), 
                    // we treat it as an error or rely on the problem constraints implying termination.
                    // Given the context, we assume termination to 1.
                }

            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
            }
        }

        System.out.println("total=" + totalSteps);
    }
}
