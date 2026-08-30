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
                if (n <= 0) continue; // 1以上の整数が入力されるが、念のため

                if (n == 1) {
                    // nが1のときの手数は0
                    // この問題の構造上、nが1に到達するまでの過程を追う必要があるため、
                    // ここではnがクエリとして与えられた場合の操作をシミュレーションするのではなく、
                    // 求められているのは「各クエリ n について、操作を繰り返して1に到達するまでの手数」の合計である。
                    // しかし、問題文の意図は、入力された各nに対して、操作を繰り返して1に到達するまでのステップ数を求めることと解釈する。

                    // そこで、与えられたnに対して操作を繰り返す過程で1に到達するまでのステップ数を計算し、
                    // そのステップ数を合計する、という流れで処理を再構成する。
                    // ただし、問題文の「n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます」は、
                    // 1回の操作でnが変化し、その変化を繰り返す、という再帰的なプロセスを示唆している。

                    // 再帰的なプロセスとして解釈し、memoizationを適用する。

                    long steps = calculateSteps(n, memo);
                    totalCount += steps;

                } else {
                    // nが1でない場合の計算
                    long steps = calculateSteps(n, memo);
                    totalCount += steps;
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }

    /**
     * nが1に到達するまでの手数を計算する。
     * @param n 現在の数
     * @param memo メモ化テーブル
     * @return 1に到達するまでのステップ数
     */
    private static long calculateSteps(long n, Map<Long, Long> memo) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long nextN;
        if (n % 2 == 0) {
            nextN = n / 2;
        } else {
            nextN = 3 * n + 1;
        }

        // 1に到達するまでの手数を計算
        long steps = 1 + calculateSteps(nextN, memo);

        memo.put(n, steps);
        return steps;
    }
}
