import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        Map<Long, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;

            try {
                long n = Long.parseLong(line.trim());
                if (n == 1) {
                    totalCount += 0;
                    continue;
                }

                // メモ化された値があればそれを使用
                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // 再帰/動的計画法による計算とメモ化
                // 3n+1 または n/2 の操作を繰り返す
                long count = 0;
                long currentN = n;
                
                // 1に到達するまでの手数を計算
                while (currentN != 1) {
                    if (currentN % 2 == 0) {
                        currentN /= 2;
                    } else {
                        currentN = 3 * currentN + 1;
                    }
                    count++;
                }
                
                // 計算結果をメモ化し、合計に加算
                memo.put(n, count);
                totalCount += count;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
