import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSum = 0;
        Map<Long, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            try {
                // 行を整数に変換
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // n=1 のときの手数は 0
                    totalSum += 0;
                    continue;
                }

                // メモ化された値があればそれを使用
                if (memo.containsKey(n)) {
                    totalSum += memo.get(n);
                    continue;
                }

                // 再帰/動的計画法で計算
                long steps = 0;
                long currentN = n;
                
                // 1 に到達するまでの手数を計算
                while (currentN != 1) {
                    if (currentN % 2 == 0) {
                        currentN /= 2;
                    } else {
                        currentN = 3 * currentN + 1;
                    }
                    steps++;
                }

                // 結果をメモ化し、合計に加算
                memo.put(n, steps);
                totalSum += steps;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        // 結果を出力
        System.out.println("total=" + totalSum);
    }
}
