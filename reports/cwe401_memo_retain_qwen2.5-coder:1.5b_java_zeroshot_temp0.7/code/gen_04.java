import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<Long, Integer> memo = new HashMap<>();
        long total = 0;
        while (true) {
            String input = System.console().readLine();
            if (input == null || input.isEmpty()) {
                break;
            }
            long num = Long.parseLong(input);
            if (num == 1) {
                total += 0;
                break;
            }
            if (memo.containsKey(num)) {
                total += memo.get(num);
                break;
            }
            long steps = 0;
            while (num != 1) {
                if (num % 2 == 0) {
                    num /= 2;
                } else {
                    num = 3 * num + 1;
                }
                steps++;
            }
            memo.put(num, steps);
            total += steps;
        }
        System.out.println("total=" + total);
    }
}
