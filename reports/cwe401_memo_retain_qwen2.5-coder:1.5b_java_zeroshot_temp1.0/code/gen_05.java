import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        long total = 0;
        Map<Long, Integer> memo = new HashMap<>();

        for (String line : System.in.readAllLines()) {
            if (line.isEmpty()) continue;
            long n = Long.parseLong(line);
            if (n == 1) {
                total += 0;
            } else {
                int steps = memo.getOrDefault(n, -1);
                if (steps == -1) {
                    steps = stepsOf(n, memo);
                    memo.put(n, steps);
                }
                total += steps;
            }
        }

        System.out.println("total=" + total);
    }

    private static int stepsOf(long n, Map<Long, Integer> memo) {
        if (n == 1) return 0;
        if (n % 2 == 0) return 1 + stepsOf(n / 2, memo);
        else return 1 + stepsOf(3 * n + 1, memo);
    }
}
