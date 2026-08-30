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
                    // nが1のときの手数は0
                    // このnがクエリの答えであるため、totalStepsに加算する
                    // ただし、問題文の意図を再解釈する。
                    // 「各クエリ n について、n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。」
                    // これは、与えられた初期値 n から 1 に到達するまでの操作回数を求めることを意味する。
                    // したがって、ここでは n がクエリであり、その n から 1 への操作回数を計算する。
                    // もし n=1 なら手数は 0。
                    totalSteps += 0;
                    continue;
                }

                // メモ化された値があればそれを使用
                if (memo.containsKey(n)) {
                    totalSteps += memo.get(n);
                    continue;
                }

                // 計算処理（ここでメモ化を再帰的に行う）
                long steps = 0;
                long current = n;
                
                // 3n+1問題の解法（コナーの定理に基づき、nが3の倍数でない限り、3n+1操作を繰り返す）
                // ただし、この問題は「1に到達するまでの手数」を求めるため、単純な再帰または反復でシミュレーションする。
                // 繰り返し操作の回数を数える。
                
                // ここでは、nから1に到達するまでの操作回数を求める。
                // 1に到達するまでの操作回数を求めるため、操作を繰り返す。
                // 1に到達するまでの手数を求める問題は、通常、nから1に到達するまでのステップ数を意味する。

                // 1に到達するまでの手数を求めるシミュレーション
                long tempN = n;
                long steps_to_one = 0;
                
                while (tempN != 1) {
                    if (tempN % 2 == 0) {
                        tempN = tempN / 2;
                    } else {
                        tempN = 3 * tempN + 1;
                    }
                    steps_to_one++;
                }
                
                totalSteps += steps_to_one;
                memo.put(n, steps_to_one);

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalSteps);
    }
}
