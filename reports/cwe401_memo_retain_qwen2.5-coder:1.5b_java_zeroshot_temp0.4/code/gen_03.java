import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<Long, Integer> memo = new HashMap<>();
        int total = 0;

        while (true) {
            long n = Long.parseLong(System.in);
            if (n == 0) {
                break;
            }
            total += memo.computeIfAbsent(n, Main::calculateSteps);
        }

        System.out.println("total=" + total);
    }

    private static int calculateSteps(long n) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        int steps = n % 2 == 0 ? calculateSteps(n / 2) + 1 : calculateSteps(3 * n + 1) + 1;
        memo.put(n, steps);
        return steps;
    }
}
