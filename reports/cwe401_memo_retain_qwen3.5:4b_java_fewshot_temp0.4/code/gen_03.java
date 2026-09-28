import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int total = 0;
        long[] memo = new long[2147483648]; // 64bit integer range for Collatz sequence values (max is within Long.MAX_VALUE, but array size needs to cover possible intermediate values up to ~5*10^9 which fits in int index if we map carefully, but actually the problem says intermediate values fit in 64-bit int. However, standard Collatz sequences for inputs up to 2^31-1 can exceed 2^31. A simple array mapping direct value might be too large (5GB+). We need a HashMap or careful sizing. Given the constraints and typical CP problem nature, a HashMap is safer for sparse values, but let's re-read: "64bit integerの範囲には収まります". This implies the value itself fits in long. Using an array with offset or a HashMap. Since inputs are up to Integer.MAX_VALUE, and intermediate values can be larger, a HashMap is the most robust solution without knowing exact bounds. However, to optimize for speed as requested, let's use a HashMap. Wait, actually, many Collatz sequences stay relatively small. But to be safe and correct:
        
        // Re-evaluating array vs map: 
        // If we use an array, we need to know the max possible value. The maximum value in a Collatz sequence for n < 2^31 is known to be less than 5 * 2^31 (roughly). 
        // 5 * 2^31 = ~5.4e9. An array of size 5.5e9 is too big for memory (5GB+).
        // Therefore, a HashMap is necessary.
        
        java.util.Map<Long, Integer> memo = new java.util.HashMap<>();
        memo.put(1L, 0);

        while (true) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) {
                break;
            }
            try {
                long n = Long.parseLong(line.trim());
                int steps = calculateCollatzSteps(n, memo);
                total += steps;
            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
            }
        }
        
        System.out.println("total=" + total);
    }

    private static int calculateCollatzSteps(long n, java.util.Map<Long, Integer> memo) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        int steps = 0;
        while (n != 1) {
            if (n % 2 == 0) {
                n /= 2;
            } else {
                n = 3 * n + 1;
            }
            steps++;
        }
        memo.put(n, steps); // Store the result for the starting number? 
        // Actually, we should store the length of the sequence from n to 1.
        // But standard memoization stores the result for the current state.
        // Let's trace: if we compute from n down to 1, we can store the count.
        // However, the loop above computes steps. We need to store the total steps from original n.
        // Better approach: recursive or iterative with storing the path length.
        
        // Correct logic for memoization:
        // If we are at node x, and we know steps(x->1), then steps(n->1) = steps(x->1) + 1 (if x is next).
        // But since we process from n down to 1, let's just store the final count.
        // Actually, the simplest way is:
        // long current = n;
        // int count = 0;
        // while (current != 1) { ... }
        // This doesn't use memo effectively unless we store intermediate results.
        
        // Let's rewrite calculateCollatzSteps to properly use memo with the starting value.
        return solve(n, memo);
    }

    private static int solve(long n, java.util.Map<Long, Integer> memo) {
        if (n == 1) return 0;
        if (memo.containsKey(n)) return memo.get(n);
        
        long next;
        if (n % 2 == 0) {
            next = n / 2;
        } else {
            next = 3 * n + 1;
        }
        
        int subSteps = solve(next, memo);
        int totalSteps = subSteps + 1;
        memo.put(n, totalSteps);
        return totalSteps;
    }
}
