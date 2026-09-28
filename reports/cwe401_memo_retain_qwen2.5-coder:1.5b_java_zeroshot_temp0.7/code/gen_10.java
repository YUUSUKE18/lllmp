import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<Long, Integer> memo = new HashMap<>();
        int total = 0;

        while (true) {
            long n = Long.parseLong(System.in.readLine());
            if (n == 1) {
                System.out.println("total=" + total);
                break;
            }
            if (memo.containsKey(n)) {
                total += memo.get(n);
                continue;
            }
            memo.put(n, countSteps(n, memo));
            total += memo.get(n);
        }
    }

    private static int countSteps(long n, Map<Long, Integer> memo) {
        if (n == 1) {
            return 0;
        }
        if (n % 2 == 0) {
            return 1 + countSteps(n / 2, memo);
        } else {
            return 1 + countSteps(3 * n + 1, memo);
        }
    }
}
