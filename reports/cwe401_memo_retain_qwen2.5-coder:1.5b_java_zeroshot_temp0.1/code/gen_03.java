import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;

        while (true) {
            int n = Integer.parseInt(System.in);
            if (n == 1) {
                break;
            }
            if (memo.containsKey(n)) {
                total += memo.get(n);
                continue;
            }
            int steps = 0;
            while (n != 1) {
                steps++;
                if (n % 2 == 0) {
                    n /= 2;
                } else {
                    n = 3 * n + 1;
                }
                if (memo.containsKey(n)) {
                    steps += memo.get(n);
                    break;
                }
                memo.put(n, steps);
            }
            total += steps;
        }

        System.out.println("total=" + total);
    }
}
