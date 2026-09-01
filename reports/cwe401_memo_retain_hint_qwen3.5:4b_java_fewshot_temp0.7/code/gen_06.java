import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Integer> memo = new HashMap<>();
        memo.put(1L, 0);
        
        long totalSteps = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            try {
                int num = Integer.parseInt(line.trim());
                if (num < 0 || num > Integer.MAX_VALUE) continue;
                long n = num;
                
                while (n != 1 && !memo.containsKey(n)) {
                    if (n % 2 == 0) {
                        n /= 2;
                    } else {
                        n = 3L * n + 1;
                    }
                    memo.put(n, memo.getOrDefault((long)n / 2, Integer.MAX_VALUE)); // Placeholder logic for memoization key update if needed, but since we compute step by step, we just store the current state.
                    // Actually, the correct way is to store the result for n as (steps from n).
                    // Let's restructure: steps(n) = 1 + steps(next(n))
                }
                
                // Recalculate properly with memoization
                long steps = computeSteps(n);
                totalSteps += steps;
            } catch (NumberFormatException e) {
                // Ignore invalid lines
            }
        }
        
        System.out.println("total=" + totalSteps);
    }

    private static int computeSteps(long n, Map<Long, Integer> memo) {
        if (n == 1) return 0;
        if (memo.containsKey(n)) return memo.get(n);
        
        int steps;
        long nextN;
        if (n % 2 == 0) {
            nextN = n / 2;
        } else {
            nextN = 3L * n + 1;
        }
        
        steps = 1 + computeSteps(nextN, memo);
        memo.put(n, steps);
        return steps;
    }
}
