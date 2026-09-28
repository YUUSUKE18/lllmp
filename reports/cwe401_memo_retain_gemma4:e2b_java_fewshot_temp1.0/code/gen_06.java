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
            try {
                // 空行は無視
                if (line.trim().isEmpty()) continue;
                
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // nが1のときの手数は0
                    // memo.put(1L, 0L); // 1はベースケースとして既に考慮されているか、計算上不要
                    continue;
                }

                // メモ化された値があればそれを使用
                if (memo.containsKey(n)) {
                    totalSteps += memo.get(n);
                    continue;
                }

                // 再帰または動的計画法で計算
                // nが偶数なら n/2, 奇数なら 3n+1
                long steps;
                if (n % 2 == 0) {
                    steps = (n / 2) + memo.get(n / 2);
                } else {
                    steps = (3 * n + 1) + memo.get(3 * n + 1);
                }
                
                // 最終的な結果をメモ化
                memo.put(n, steps);
                totalSteps += steps;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalSteps);
    }
}
