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

        while (true) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // 1 に到達するまでの手数は 0
                    totalCount += 0;
                    continue;
                }

                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // 計算とメモ化
                long steps;
                if (n % 2 == 0) {
                    // n が偶数なら n/2
                    steps = 1 + memo.getOrDefault(n / 2, 0);
                } else {
                    // n が奇数なら 3n+1
                    steps = 1 + memo.getOrDefault(3 * n + 1, 0);
                }

                // ここでのメモ化のロジックは、問題文の「n が 1 のときの手数は 0」という定義と
                // 「n が 1 に到達するまでの手数を求める」という要求をどう解釈するかで変わります。
                // 通常、この種の問題は「1 に到達するまでのステップ数」を求めるため、
                // 遷移をたどる過程でステップ数を加算します。

                // 再度、問題の意図を再確認します。「n が 1 に到達するまでの手数を求めます。」
                // これは、n から 1 へのパスの長さを求めることを意味します。
                // 遷移をたどる過程で、その遷移を1ステップとしてカウントします。

                // 再度、メモ化のロジックを「n から 1 への最短経路」として再定義します。
                // 遷移をたどるたびにステップ数を加算します。

                // 遷移の再計算（メモ化を再構成）
                long currentSteps = 0;
                long currentN = n;
                
                // 1 に到達するまでのステップ数を計算
                while (currentN != 1) {
                    if (currentN % 2 == 0) {
                        currentN /= 2;
                    } else {
                        currentN = 3 * currentN + 1;
                    }
                    currentSteps++;
                }
                
                // 計算結果をメモ化し、合計に加算
                memo.put(n, currentSteps);
                totalCount += currentSteps;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
