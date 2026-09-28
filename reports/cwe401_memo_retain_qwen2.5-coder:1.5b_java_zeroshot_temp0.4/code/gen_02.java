import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;

        while (true) {
            int n = readInput();
            if (n == 0) {
                break;
            }

            int steps = 0;
            while (n != 1) {
                steps++;
                if (memo.containsKey(n)) {
                    steps += memo.get(n);
                    break;
                }
                if (n % 2 == 0) {
                    n /= 2;
                } else {
                    n = 3 * n + 1;
                }
                memo.put(n, steps);
            }

            total += steps;
        }

        System.out.println("total=" + total);
    }

    private static int readInput() {
        try {
            return Integer.parseInt(System.in.readLine());
        } catch (Exception e) {
            return 0;
        }
    }
}
