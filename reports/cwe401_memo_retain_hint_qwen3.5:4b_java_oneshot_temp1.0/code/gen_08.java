import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        memo.put(1, 0);
        long total = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            
            try {
                int n = Integer.parseInt(line.trim());
                if (!memo.containsKey(n)) {
                    memo.put(n, calculateSteps(n));
                }
                total += memo.get(n);
            } catch (NumberFormatException e) {
            }
        }
        
        System.out.println("total=" + total);
    }
    
    private static int calculateSteps(int n) {
        int steps = 0;
        while (n != 1) {
            if (memo.containsKey(n)) {
                return memo.get(n);
            }
            
            if (n % 2 == 0) {
                n = n / 2;
            } else {
                long next = 3L * n + 1;
                n = Math.min((int)next, Integer.MAX_VALUE);
                // Safety check to prevent overflow before storing in int map
                // Although the problem says values fit in 64-bit, we use long for calculation
            }
            
            if (n == 1) {
                steps++;
                break;
            }
            
            // For larger numbers that might not fit in int, we need to handle carefully.
            // However, Collatz sequences usually stay within reasonable bounds for practical inputs.
            // If n exceeds Integer.MAX_VALUE during calculation, we should continue with long logic.
            // Since we are memoizing on Integer keys, if a value > Integer.MAX_VALUE appears, 
            // it won't be stored in the current map structure unless we change the key type.
            // To ensure correctness and avoid infinite loops or crashes, we handle potential overflow:
            
            if (n >= 1073741825) { // Close to MAX_VALUE
                 // We need to track steps even if n doesn't fit in int immediately? 
                 // Actually, the Collatz conjecture holds for all tested numbers.
                 // Let's recalculate carefully:
            }
            
            // Recalculate using long to avoid overflow issues during step
            long currentN = Math.min((n >= 2147483647 ? n : n), 2147483647L); 
            if (n > Integer.MAX_VALUE) {
                // This case implies the previous multiplication exceeded int range significantly.
                // We'll need to re-calculate from there.
                long prev = n; // n is already long here conceptually
                while (prev != 1 && (prev > 2147483647L)) {
                     if (prev % 2 == 0) {
                         prev /= 2;
                     } else {
                         prev = 3 * prev + 1;
                     }
                     steps++;
                }
                // Store in memo only if it fits back into int
                if (steps > Integer.MAX_VALUE) return steps; 
            } else {
                 // Standard path
                 while (n != 1 && !memo.containsKey(n)) {
                    if (n % 2 == 0) n /= 2;
                    else n = 3 * n + 1;
                     if (n > Integer.MAX_VALUE) {
                         // This should not happen in typical Collatz problems unless input is huge
                         // But let's assume it happens: we just continue calculation
                         steps++;
                         if (n == 1) break;
                     } else if (!memo.containsKey(n)) {
                         memo.put(n, -1); // Temporary placeholder or recalculate
                         // Actually, better to just iterate and store
                     }
                 }
            }
            
            return steps;
        }
        
        return 0;
    }
}
