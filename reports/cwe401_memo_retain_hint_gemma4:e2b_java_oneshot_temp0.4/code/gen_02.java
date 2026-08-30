import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行読み込み、空行や不正な行を無視して整数を読み込む
        String line;
        Map<Integer, Long> memo = new HashMap<>();
        long totalSteps = 0;

        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            try {
                int n = Integer.parseInt(line.trim());
                
                if (n == 1) {
                    // nが1のときの手数は0
                    memo.put(1, 0L);
                } else if (!memo.containsKey(n)) {
                    // メモ化されていない場合、計算を実行
                    long steps = calculateSteps(n, memo);
                    memo.put(n, steps);
                }
                
                // 手数を合計に加算
                totalSteps += memo.get(n);

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        // 結果の出力
        System.out.println("total=" + totalSteps);
    }

    /**
     * nが1になるまでの手数を再帰的メモ化（DP）で計算する
     * @param n 現在の数
     * @param memo メモ化テーブル
     * @return 1に到達するまでの手数
     */
    private static long calculateSteps(int n, Map<Integer, Long> memo) {
        if (n == 1) {
            return 0L;
        }
        
        // 再帰呼び出し前にメモを確認
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long result;
        if (n % 2 == 0) {
            // nが偶数なら n/2
            result = calculateSteps(n / 2, memo) + 1;
        } else {
            // nが奇数なら 3n+1
            result = calculateSteps(3 * n + 1, memo) + 1;
        }

        // 結果をメモ化
        memo.put(n, result);
        return result;
    }
}
