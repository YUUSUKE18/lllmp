import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;

        while (true) {
            int input = Integer.parseInt(System.in);
            if (input == 0) {
                break;
            }
            total += computeSteps(input, memo);
        }

        System.out.println("total=" + total);
    }

    private static int computeSteps(int n, Map<Integer, Integer> memo) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        int steps = 0;
        while (n != 1) {
            steps++;
            if (n % 2 == 0) {
                n /= 2;
            } else {
                n = 3 * n + 1;
            }
        }

        memo.put(n, steps);
        return steps;
    }
}
