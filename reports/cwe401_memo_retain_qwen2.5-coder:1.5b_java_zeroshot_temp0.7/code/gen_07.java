import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<Long, Integer> memo = new HashMap<>();
        long total = 0;

        for (String query : System.in.lines().filter(q -> !q.isEmpty())) {
            long num = Long.parseLong(query);
            if (memo.containsKey(num)) {
                total += memo.get(num);
            } else {
                int steps = 0;
                while (num != 1) {
                    memo.put(num, steps);
                    if (num % 2 == 0) {
                        num /= 2;
                    } else {
                        num = 3 * num + 1;
                    }
                    steps++;
                }
                total += steps;
            }
        }

        System.out.println("total=" + total);
    }
}
