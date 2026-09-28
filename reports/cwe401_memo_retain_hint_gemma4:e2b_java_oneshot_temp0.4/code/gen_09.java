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
            if (line == null) {
                break;
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

                long steps;
                if (n % 2 == 0) {
                    // n が偶数なら n/2
                    steps = 1 + memo.get(n / 2);
                } else {
                    // n が奇数なら 3n+1
                    steps = 1 + memo.get(3 * n + 1);
                }

                // 再帰的な計算ではなく、メモ化を考慮して直接計算する（ただし、この問題は「1に到達するまでの手数」なので、再帰的な構造をメモ化する）
                // ここでは、nから1に到達するまでのステップ数を求める問題なので、再帰的な構造をメモ化します。
                // ただし、問題文の「操作を繰り返し、1 に到達するまでの手数を求めます」は、
                // 1回のクエリ n に対して、n -> f(n) -> f(f(n)) -> ... -> 1 に到達するまでのステップ数を求めることを意味します。

                // 修正: n が与えられたときの、1に到達するまでのステップ数を求める。
                // 1回の操作で1ステップ消費する。
                
                // 状態遷移を再評価:
                // n=1 -> 0ステップ
                // n=2 -> 1 + steps(1) = 1
                // n=3 -> 1 + steps(10)
                // n=4 -> 1 + steps(2)
                // n=5 -> 1 + steps(16)
                
                // 1回のクエリ n に対するステップ数を求める。
                // 1回の操作で1ステップ消費する。
                
                long currentN = n;
                long count = 0;
                
                while (currentN != 1) {
                    if (currentN % 2 == 0) {
                        currentN /= 2;
                    } else {
                        currentN = 3 * currentN + 1;
                    }
                    count++;
                }
                
                memo.put(n, count);
                totalCount += count;

            } catch (NumberFormatException e) {
                // 無効な入力は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
