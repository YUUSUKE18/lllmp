import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;

        while (true) {
            int n = Integer.parseInt(System.in);
            if (n == 0) {
                break;
            }
            total += memo.computeIfAbsent(n, Main::calculateSteps);
        }

        System.out.println("total=" + total);
    }

    private static int calculateSteps(int n) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        int steps = 1 + (n % 2 == 0 ? calculateSteps(n / 2) : calculateSteps(3 * n + 1));
        memo.put(n, steps);
        return steps;
    }
}
