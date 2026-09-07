import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;

        while (true) {
            String input = System.in.readLine();
            if (input == null || input.isEmpty()) {
                break;
            }

            int n = Integer.parseInt(input);
            if (n == 1) {
                total += 0;
            } else {
                int steps = 0;
                while (n != 1) {
                    if (memo.containsKey(n)) {
                        steps += memo.get(n);
                        break;
                    }
                    if (n % 2 == 0) {
                        n /= 2;
                    } else {
                        n = 3 * n + 1;
                    }
                    steps++;
                }
                total += steps;
                memo.put(n, steps);
            }
        }

        System.out.println("total=" + total);
    }
}
