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
            if (line == null || line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // 1 に到達するまでの手数は 0
                    // ただし、これはクエリ n の結果ではなく、n から 1 に到達するまでの手数を求める問題なので、
                    // n=1 の場合は 0 を返す。
                    // ここでは、n から 1 に到達するまでのステップ数を求める。
                    // n=1 の場合は 0 ステップ。
                    // ただし、問題文の「n が 1 のときの手数は 0 です」は、n=1 からの操作を終了と見なす。
                    // 実際には、n から 1 に到達するまでの操作回数を数える。
                    // n=1 の場合は、既に 1 なので 0 回。
                    // 後の計算で n=1 が現れた場合の処理を考慮し、ここでは n=1 の場合は 0 を返す。
                    if (memo.containsKey(n)) {
                        totalSteps += memo.get(n);
                    } else {
                        // n=1 の場合は 0
                        memo.put(n, 0L);
                        totalSteps += 0;
                    }
                } else if (!memo.containsKey(n)) {
                    long steps;
                    if (n % 2 == 0) {
                        // n が偶数なら n/2
                        steps = 1 + memo.get(n / 2);
                    } else {
                        // n が奇数なら 3n+1
                        steps = 1 + memo.get(3 * n + 1);
                    }
                    memo.put(n, steps);
                    totalSteps += steps;
                } else {
                    // メモがあれば合計に加算
                    totalSteps += memo.get(n);
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalSteps);
    }
}
