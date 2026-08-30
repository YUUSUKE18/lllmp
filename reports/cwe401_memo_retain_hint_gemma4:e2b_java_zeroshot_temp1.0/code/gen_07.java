import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
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
                    // nが1のときの手数は0
                    long count = 0;
                    totalCount += count;
                    // メモ化
                    memo.put(n, count);
                    continue;
                }

                if (memo.containsKey(n)) {
                    // メモがあればそれを加算
                    totalCount += memo.get(n);
                    continue;
                }

                // 再帰/メモ化探索
                long currentN = n;
                long steps = 0;
                // 探索中に同じ値が再出現した場合のサイクル検出（オプションだが、最大値との比較で十分な場合も考慮。今回は1への到達が保証されるため、純粋なメモ化のみで十分と判断）
                
                // 1への到達までの手数を計算
                while (currentN != 1) {
                    if (memo.containsKey(currentN)) {
                        // 既に計算済みの値に到達した場合
                        long subSteps = memo.get(currentN);
                        steps += subSteps;
                        break;
                    }
                    
                    if (currentN % 2 == 0) {
                        currentN /= 2;
                    } else {
                        // 奇数: 3n + 1
                        currentN = 3 * currentN + 1;
                    }
                    steps++;
                }
                
                // 計算結果をメモ化して合計に加算
                memo.put(n, steps);
                totalCount += steps;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視 (仕様通り)
            }
        }

        System.out.println("total=" + totalCount);
    }
}
