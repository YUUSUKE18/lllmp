import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<Long, Integer> memo = new HashMap<>();
        int total = 0;

        while (true) {
            long n = Long.parseLong(System.in);
            if (n == 1) {
                break;
            }
            total += memo.computeIfAbsent(n, k -> {
                int steps = 0;
                while (k != 1) {
                    steps++;
                    if (k % 2 == 0) {
                        k /= 2;
                    } else {
                        k = 3 * k + 1;
                    }
                }
                return steps;
            });
        }

        System.out.println("total=" + total);
    }
}
