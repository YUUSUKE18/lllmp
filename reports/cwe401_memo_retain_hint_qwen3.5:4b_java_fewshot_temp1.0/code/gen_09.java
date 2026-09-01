import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringBuilder totalSum = new StringBuilder(); // Accumulate sums for each query
        
        long currentTotal = 0L;
        
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                int n = Integer.parseInt(line);
                int steps = calculateCollatz(n);
                currentTotal += steps;
            } catch (NumberFormatException e) {
                // Ignore invalid lines
            }
        }
        
        System.out.println("total=" + currentTotal);
    }
    
    private static int calculateCollatz(int n, boolean cacheActive) {
        if (!cacheActive) {
            // First run without caching to establish all values
            return collatzWithoutCache(n);
        } else {
            // Subsequent runs use cache for speedup
            return collatzWithCache(n);
        }
    }
    
    // Memoization array using Long to handle potential overflow during intermediate steps
    private static final long[] cache = new long[100000]; 
    private static int memoizedValuesCount;
    
    private static int collatzWithCache(int n) {
        if (n == 1) return 0;
        
        // If value is within cache, retrieve it
        // We can't use a perfect map due to memory constraints, but for most numbers the sequence
        // stays relatively small or cycles before hitting large values. 
        // Instead of trying to preallocate too much, we use an approach with limited caching per run
        // and fallback computation for unknown values.
        
        long path[] = new long[1024]; // Track path to detect cycles (though 3n+1 usually doesn't cycle)
        int idx = 0;
        path[idx++] = n;
        int steps = 0;
        
        while (n != 1) {
            if (n == path[idx-2]) return -1; // Should not happen for valid inputs
            
            long nextVal;
            if (n % 2 == 0) {
                nextVal = n / 2;
            } else {
                nextVal = 3L * n + 1;
            }
            
            steps++;
            
            // Handle potential overflow: if nextVal exceeds Long.MAX_VALUE, stop. 
            // However, problem statement says intermediate values fit in 64-bit integer, so this won't happen.
            if (nextVal > 2_000_000_000_000_000L) { 
                // In case of unexpected large numbers, break to prevent TLE/MLE on adversarial cases
                // but assume valid input fits in long as per spec.
                // Actually, if it's truly larger than what we can track easily, we just continue.
            }
            
            n = (int) nextVal; // Safe cast based on problem statement guarantee
            
            // Optimization: Check if we've seen this number before in the current path or a previous run
            // Since we are processing one by one, let's just compute efficiently without global caching across all inputs to save memory
        }
        
        return steps;
    }
    
    private static int collatzWithoutCache(int n) {
        int steps = 0;
        long currentVal = n;
        
        while (currentVal != 1) {
            if (currentVal % 2 == 0) {
                currentVal /= 2;
            } else {
                currentVal *= 3 + 1L;
            }
            steps++;
            
            // Convert back to int for next iteration logic, relying on problem guarantee of fitting in long/int range eventually
            if (currentVal > Integer.MAX_VALUE) {
                // If it exceeds int range during calculation but fits in long, we continue.
                // But since the output requires integer steps and input is int, 
                // and spec says intermediate values fit in 64-bit int, we just keep going.
            }
        }
        
        return steps;
    }
}
