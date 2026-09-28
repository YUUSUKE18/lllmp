import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;

        while (true) {
            String input = System.in.readLine();
            if (input.isEmpty()) {
                break;
            }
            int n = Integer.parseInt(input);

            if (n == 1) {
                total += 0;
            } else if (memo.containsKey(n)) {
                total += memo.get(n);
            } else {
                int steps = 1;
                while (n != 1) {
                    if (n % 2 == 0) {
                        n /= 2;
                    } else {
                        n = 3 * n + 1;
                    }
                    steps++;
                }
                memo.put(n, steps);
                total += steps;
            }
        }

        System.out.println("total=" + total);
    }
}
