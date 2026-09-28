import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        Map<Integer, Long> memo = new HashMap<>();

        while (true) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) {
                continue;
            }

            try {
                int n = Integer.parseInt(line.trim());

                if (n == 1) {
                    // 1 に到達するまでの手数は 0
                    // memo.put(1, 0L); // 1 は終了条件なので、ここでは計算しない
                    continue;
                }

                // メモ化された結果があるか確認
                if (memo.containsKey(n)) {
                    long count = memo.get(n);
                    totalCount += count;
                    continue;
                }

                // 再帰または動的計画法で計算
                long count;
                if (n % 2 == 0) {
                    // n が偶数なら n/2
                    count = 1 + memo.getOrDefault(n / 2, 0L);
                } else {
                    // n が奇数なら 3n+1
                    count = 1 + memo.getOrDefault(3 * n + 1, 0L);
                }

                // 計算結果をメモ化
                memo.put(n, count);
                totalCount += count;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
