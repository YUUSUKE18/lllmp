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
                long n = Long.parseLong(line.trim());
                if (n == 1) {
                    // 1 のときの手数は 0
                    continue;
                }

                // メモ化された値があればそれを使用
                if (memo.containsKey(n)) {
                    long steps = memo.get(n);
                    totalSteps += steps;
                    continue;
                }

                // 再帰または反復計算
                long currentN = n;
                long steps = 0;
                
                // 64bit整数に収まる範囲で計算を続ける
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
                totalSteps += steps;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalSteps);
    }
}
