import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                long n = Long.parseLong(line);
                if (n == 1) {
                    total += 0;
                } else {
                    int steps = calculateCollatz(n, memo);
                    total += steps;
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("total=" + total);
    }
    
    private static int calculateCollatz(long n, Map<Integer, Integer> memo) {
        if (memo.containsKey((int)n)) {
            return memo.get((int)n);
        }
        
        int steps = 0;
        long current = n;
        
        while (current != 1) {
            if (current % 2 == 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            
            // Check for overflow before storing in map, though problem guarantees it fits in long
            // We store intermediate values that fit in Integer range if possible to save space, 
            // but since the sequence can exceed Integer.MAX_VALUE, we use Long for calculation.
            // However, the memoization key must be Integer as per spec "32bit integer".
            // If current exceeds Integer.MAX_VALUE, it won't fit in map key, so we skip memoizing large values 
            // or handle them carefully. The problem says intermediate values fit in 64-bit integer.
            // We only memoize if the value fits in Integer range to keep keys as Integer.
            
            if (current <= Integer.MAX_VALUE) {
                int key = (int) current;
                if (!memo.containsKey(key)) {
                    steps++;
                    return calculateCollatz(current, memo);
                } else {
                    steps += memo.get(key);
                    return steps;
                }
            } else {
                // Value exceeds Integer.MAX_VALUE, cannot use as map key directly.
                // We continue calculation without memoizing this specific large value 
                // to avoid KeyException or casting issues, but we might hit a smaller value later.
                steps++;
            }
        }
        
        return steps;
    }
}
