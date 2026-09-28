import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<Long, Integer> memo = new HashMap<>();
        long total = 0;

        while (true) {
            try {
                long query = Long.parseLong(System.in.readLine());
                if (query == 1) {
                    break;
                }
                if (memo.containsKey(query)) {
                    total += memo.get(query);
                    continue;
                }
                int steps = query;
                memo.put(query, steps);
                while (query != 1) {
                    steps++;
                    if (query % 2 == 0) {
                        query /= 2;
                    } else {
                        query = 3 * query + 1;
                    }
                    memo.put(query, steps);
                }
                total += steps;
            } catch (NumberFormatException e) {
                // 何か入力ミスで不正な数が入力されたらスルー
                continue;
            }
        }

        System.out.println("total=" + total);
    }
}
