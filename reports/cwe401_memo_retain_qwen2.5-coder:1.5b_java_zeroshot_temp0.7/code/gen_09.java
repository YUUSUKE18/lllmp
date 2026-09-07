import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;

        while (true) {
            String query = System.in.readLine();
            if (query == null || query.isEmpty()) {
                break;
            }
            int n = Integer.parseInt(query);

            if (memo.containsKey(n)) {
                total += memo.get(n);
                continue;
            }

            int steps = 0;
            while (n != 1) {
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

        System.out.println("total=" + total);
    }
}
