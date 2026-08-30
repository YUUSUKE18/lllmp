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

        while (true) {
            String line = br.readLine();
            if (line == null) {
                break;
            }

            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // nが1のときの手数は0
                    // ただし、これはクエリに対する操作の「手数」ではなく、その値自体がゴールなので、
                    // ここでは「1に到達するまでの手数」を求めるため、n=1の場合は0として扱う。
                    // ただし、次の計算のために、memoに追加する。
                    memo.put(n, 0L);
                    totalSteps += 0;
                    continue;
                }

                // メモがあればそれを使う
                if (memo.containsKey(n)) {
                    totalSteps += memo.get(n);
                    continue;
                }

                // 再帰/メモ化再帰で計算
                long currentN = n;
                long steps = 0;
                
                // 1に到達するまでの手数を求める
                while (currentN != 1) {
                    if (memo.containsKey(currentN)) {
                        steps += memo.get(currentN);
                        break;
                    }
                    
                    if (currentN % 2 == 0) {
                        currentN /= 2;
                    } else {
                        currentN = 3 * currentN + 1;
                    }
                    steps++;
                }
                
                // 計算結果をメモ化
                // ここでmemoに格納するのは、nから1に到達するまでの手数
                memo.put(n, steps);
                totalSteps += steps;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalSteps);
    }
}
