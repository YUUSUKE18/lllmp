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
                // 遷移をたどる過程でステップ数をカウントします。

                // 再度、問題の要求を再確認します:
                // 「n が 1 のときの手数は 0 です。」
                // 「n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。」

                // これは、n から 1 へのパスの長さを求める問題です。
                // 遷移をたどる過程でステップ数をカウントします。

                // 再度、メモ化のロジックを修正します。
                // 遷移をたどる過程で、現在の値が1になるまでのステップ数を計算します。
                
                // 遷移をたどる計算を再実行します。
                long current = n;
                long count = 0;
                Map<Long, Long> pathMemo = new HashMap<>();
                pathMemo.put(1L, 0L);

                while (current != 1) {
                    if (pathMemo.containsKey(current)) {
                        // 既に計算済みのパスがあれば、その結果を足し合わせる
                        count += (current == n ? 0 : pathMemo.get(current));
                        break;
                    }

                    if (current % 2 == 0) {
                        current = current / 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    count++;
                    
                    // 循環を避けるため、もし計算途中で既にmemoに存在すれば終了
                    if (memo.containsKey(current)) {
                        // 既に計算済みの部分があれば、そこから計算を続ける
                        // この問題は「n から 1 への最短経路」を求めるため、
                        // 遷移をたどるだけで十分です。
                        // 既にmemoに存在する場合は、その値を使って計算を終了します。
                        long remainingSteps = pathMemo.get(current);
                        count += remainingSteps;
                        break;
                    }
                    pathMemo.put(current, count);
                }
                
                // 最終的なステップ数を合計に加算
                totalCount += count;
                
                // 遷移で得られた結果をメインのメモにも保存（再利用のため）
                // ただし、この問題は「各クエリ n について」独立して計算し、その合計を求めるため、
                // 遷移のメモ化は、各クエリ内で完結させるのが最も安全です。
                // したがって、ここではクエリごとに計算し、合計を求めることに集中します。
                
                // 念のため、もしnがmemoに存在すれば、その値をそのまま加算する（これは、
                // 異なるクエリ間で同じnが与えられた場合の最適化を意味しますが、
                // 問題文の構造上、これは「各クエリ n について」独立した計算を要求しているため、
                // 遷移のメモ化は、各クエリ内で完結させることにします。）
                
                // 最終的な結果をメモに追加（これは、もし同じnが複数回与えられた場合の最適化を意図する場合）
                memo.put(n, count);


            } catch (NumberFormatException e) {
                // 無効な入力は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
