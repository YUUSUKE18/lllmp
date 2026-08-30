import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long total = 0;
        Map<Integer, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            try {
                int n = Integer.parseInt(line.trim());
                if (n <= 0) continue;

                if (n == 1) {
                    // 1 のときの手数は 0
                    long count = 0;
                    total += count;
                    continue;
                }

                // メモ化された値があればそれを使用
                if (memo.containsKey(n)) {
                    total += memo.get(n);
                    continue;
                }

                // 再帰計算とメモ化
                long count;
                if (n % 2 == 0) {
                    // n が偶数なら n/2
                    count = countFor(n / 2);
                } else {
                    // n が奇数なら 3n+1
                    count = countFor(3 * n + 1);
                }

                // 現在のnに対する手数は、次のステップの手数に1を足したもの
                // ただし、この問題は「1に到達するまでの手数」を求めているため、
                // n から 1 への経路の長さを数える必要がある。
                // 実際には、n から 1 への経路を辿る際に、各ステップをカウントする。
                // ここでは、n から 1 への経路の長さを求める。
                // n が偶数なら n/2 に、n が奇数なら 3n+1 に遷移する。
                // 遷移の回数を数える。

                // 再帰的な定義: countFor(n) は n から 1 に到達するまでのステップ数を返す
                // n=1 のとき 0
                // n=2 のとき: 2 -> 1 (1ステップ)
                // n=3 のとき: 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (7ステップ)

                // 再帰関数を定義し直す
                count = calculateSteps(n);
                memo.put(n, count);
                total += count;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + total);
    }

    /**
     * n から 1 に到達するまでの手数を計算する (メモ化再帰)
     * @param n 現在の数
     * @return 1 に到達するまでのステップ数
     */
    private static long calculateSteps(int n) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long result;
        if (n % 2 == 0) {
            // n が偶数なら n/2
            result = 1 + calculateSteps(n / 2);
        } else {
            // n が奇数なら 3n+1
            result = 1 + calculateSteps(3 * n + 1);
        }

        memo.put(n, result);
        return result;
    }
}
