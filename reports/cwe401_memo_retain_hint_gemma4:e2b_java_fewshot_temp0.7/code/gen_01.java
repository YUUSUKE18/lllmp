import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;
        Map<Long, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // 1 に到達するまでの手数は 0
                    // memo.put(n, 0L); // 1はベースケースなので明示的に保存しなくても良いが、任意
                } else if (!memo.containsKey(n)) {
                    // 再帰または動的計画法で計算
                    // 偶数なら n/2, 奇数なら 3n+1
                    long steps;
                    if (n % 2 == 0) {
                        steps = 1 + memo.getOrDefault(n / 2, 0L);
                    } else {
                        steps = 1 + memo.getOrDefault(3 * n + 1, 0L);
                    }
                    memo.put(n, steps);
                }

                // 計算結果を合計に加算
                totalSteps += memo.get(n);

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalSteps);
    }
}
