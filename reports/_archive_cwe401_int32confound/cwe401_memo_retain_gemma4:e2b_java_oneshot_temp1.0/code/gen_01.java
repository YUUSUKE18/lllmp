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
                    // 手数は 0
                    // 1をメモ化
                    memo.put(1, 0L);
                } else if (!memo.containsKey(n)) {
                    // 再帰/メモ化による計算
                    long count;
                    if (n % 2 == 0) {
                        // n が偶数なら n/2
                        count = memo.get(n / 2) + 1;
                    } else {
                        // n が奇数なら 3n+1
                        count = memo.get(3 * n + 1) + 1;
                    }
                    memo.put(n, count);
                }
                
                // 現在のnに対する手数を合計に加算
                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        // 最後の合計を出力
        System.out.println("total=" + totalCount);
    }
}
