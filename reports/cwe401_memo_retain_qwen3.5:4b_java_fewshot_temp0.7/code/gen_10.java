import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int totalSteps = 0;
        long[][] memo = new long[65536][2]; // n/2 for even, 3n+1 for odd. Max n is around 64 bits but we only need up to ~65536 due to convergence properties in Collatz sequence starting from small integers. However, since input can be large, we use a larger array or dynamic approach. Given the constraint that intermediate values fit in 64-bit integer, we might need more than 65536. Let's adjust based on typical Collatz behavior. Actually, for 32-bit inputs, the maximum value reached is much larger than input but still within 64-bit range. We can use a HashMap for memoization to handle any size up to Long.MAX_VALUE safely.

        // Re-declare with HashMap for safety with large numbers
        java.util.HashMap<Long, Integer> memoMap = new java.util.HashMap<>();
        String line;
        while ((line = br.readLine()) != null) {
            try {
                long n = Long.parseLong(line.trim());
                if (n == 0 || !isDigitOnly(line.trim())) continue; // Skip empty or non-numeric lines

                int steps = collatzSteps(n, memoMap);
                totalSteps += steps;
            } catch (NumberFormatException e) {
                // Ignore invalid lines
            }
        }
        System.out.println("total=" + totalSteps);
    }

    private static boolean isDigitOnly(String s) {
        if (s == null || s.isEmpty()) return false;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c < '0' || c > '9') return false;
        }
        return true;
    }

    private static int collatzSteps(long n, java.util.HashMap<Long, Integer> memoMap) {
        if (n == 1) return 0;
        if (memoMap.containsKey(n)) return memoMap.get(n);

        long nextN;
        if (n % 2 == 0) {
            nextN = n / 2;
        } else {
            nextN = 3 * n + 1;
        }

        int steps = 1 + collatzSteps(nextN, memoMap);
        memoMap.put(n, steps);
        return steps;
    }
}
