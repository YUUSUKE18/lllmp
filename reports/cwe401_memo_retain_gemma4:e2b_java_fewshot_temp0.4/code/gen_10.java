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
            if (line.trim().isEmpty()) {
                continue;
            }
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

                // 再帰/動的計画法で計算
                long count = 0;
                long current = n;
                
                // 計算過程でメモ化
                Map<Long, Long> pathMemo = new HashMap<>();
                pathMemo.put(1L, 0L);
                
                // 逆方向から計算してメモ化する方が効率的だが、ここではクエリごとに計算する
                // 厳密には、各クエリ n について、n から 1 に到達するまでの手数を計算する必要がある。
                // ここでは、各クエリ n について、n から 1 に到達するまでの手数を計算する。

                long steps = 0;
                long tempN = n;
                
                // 1からnまでのパスを追跡し、メモ化を更新する
                // 実際には、この問題は「各クエリ n について、n から 1 に到達するまでの手数を求める」ので、
                // n を入力として受け取ったら、その n の手数を計算し、合計に加算する。
                
                // 繰り返し操作をシミュレーションして手数を計算
                long currentSteps = 0;
                long currentN = n;
                
                // 1 に到達するまでの手数を計算
                while (currentN != 1) {
                    if (currentN % 2 == 0) {
                        currentN /= 2;
                    } else {
                        currentN = 3 * currentN + 1;
                    }
                    currentSteps++;
                }
                
                // 計算結果をメモ化
                memo.put(n, currentSteps);
                totalCount += currentSteps;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
