import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<Long, Integer> memo = new HashMap<>();
        long total = 0;

        while (true) {
            long input = Long.parseLong(System.console().readLine());
            if (input == 0) break;

            int steps = 0;
            long current = input;
            while (current != 1) {
                if (memo.containsKey(current)) {
                    steps += memo.get(current);
                    break;
                }
                steps++;
                if (current % 2 == 0) {
                    current /= 2;
                } else {
                    current = 3 * current + 1;
                }
            }
            memo.put(input, steps);
            total += steps;
        }

        System.out.println("total=" + total);
    }
}
