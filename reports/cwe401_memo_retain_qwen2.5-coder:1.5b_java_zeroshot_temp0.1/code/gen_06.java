import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;

        while (true) {
            int query = Integer.parseInt(System.in);
            if (query == 0) {
                break;
            }
            total += calculateSteps(query, memo);
        }

        System.out.println("total=" + total);
    }

    private static int calculateSteps(int n, Map<Integer, Integer> memo) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        int steps = 0;
        if (n % 2 == 0) {
            steps = 1 + calculateSteps(n / 2, memo);
        } else {
            steps = 1 + calculateSteps(3 * n + 1, memo);
        }
        memo.put(n, steps);
        return steps;
    }
}
