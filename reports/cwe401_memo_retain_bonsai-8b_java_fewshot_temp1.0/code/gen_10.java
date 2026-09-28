import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            try {
                int n = Integer.parseInt(line);
                if (n == 1) {
                    total += 0;
                    continue;
                }
                int count = 0;
                int current = n;
                while (current != 1) {
                    if (memo.containsKey(current)) {
                        count += memo.get(current);
                    } else {
                        int next = (current % 2 == 0) ? current / 2 : 3 * current + 1;
                        count += 1 + count(memo, next);
                    }
                    memo.put(current, count);
                    current = next;
                }
                total += count;
            } catch (NumberFormatException e) {
                // 調整して無視する
            }
        }
        System.out.println("total=" + total);
    }

    private static int count(Map<Integer, Integer> memo, int n) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        int next = (n % 2 == 0) ? n / 2 : 3 * n + 1;
        int count = 1 + count(memo, next);
        memo.put(n, count);
        return count;
    }
}
