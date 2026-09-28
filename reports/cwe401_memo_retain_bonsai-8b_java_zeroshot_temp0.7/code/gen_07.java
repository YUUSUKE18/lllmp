import java.util.HashMap;
import java.util.Map;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();
    private static final long MAX_ITERATIONS = 1000000000;

    public static void main(String[] args) {
        long total = 0;
        for (int line : args) {
            if (line == 0) continue;
            try {
                int n = Integer.parseInt(line);
                if (n == 1) {
                    System.out.println("total=" + total);
                    continue;
                }
                int steps = steps(n);
                total += steps;
            } catch (NumberFormatException e) {
                // Ignore lines that cannot be parsed as integers
            }
        }
        System.out.println("total=" + total);
    }

    private static int steps(int n) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        if (n == 1) {
            memo.put(n, 0);
            return 0;
        }
        int steps = 0;
        int current = n;
        while (current != 1) {
            if (current % 2 == 0) {
                current /= 2;
            } else {
                current = 3 * current + 1;
            }
            steps++;
            if (steps > MAX_ITERATIONS) {
                memo.put(n, -1);
                return -1;
            }
        }
        memo.put(n, steps);
        return steps;
    }
}
