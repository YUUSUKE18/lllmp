import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;

        while (true) {
            String query = System.in.readLine();
            if (query.isEmpty() || query.startsWith(" ")) {
                continue;
            }

            int num = Integer.parseInt(query);
            if (memo.containsKey(num)) {
                total += memo.get(num);
                continue;
            }

            int steps = 0;
            while (num != 1) {
                steps++;
                if (num % 2 == 0) {
                    num /= 2;
                } else {
                    num = 3 * num + 1;
                }
            }

            total += steps;
            memo.put(num, steps);
        }

        System.out.println("total=" + total);
    }
}
