import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {

    // メモ化テーブル: 既に計算済みの値とその手数を格納
    private static Map<Long, Long> memo = new HashMap<>();

    /**
     * n から 1 に到達するまでの手数を計算する関数（メモ化付き）
     * @param n 開始値
     * @return 1 に到達するまでのステップ数
     */
    private static long calculateSteps(long n) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long next;
        if (n % 2 == 0) {
            // n が偶数なら n/2
            next = n / 2;
        } else {
            // n が奇数なら 3n+1
            // 3n+1 がオーバーフローしないように注意（long型なので問題ないはず）
            next = 3 * n + 1;
        }

        // 再帰的に次のステップの手数を計算し、現在のステップ数を加算
        long steps = 1 + calculateSteps(next);

        // 結果をメモ化して返す
        memo.put(n, steps);
        return steps;
    }

    public static void main(String[] args) throws IOException {
        // 標準入力から読み込む
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;

        String line;
        // 入力ストリームを読み込む
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }

            try {
                // 入力された文字列をlongに変換
                long n = Long.parseLong(line);
                
                // 計算を実行
                // 計算結果は再帰的にメモ化されるため、効率的
                totalSteps += calculateSteps(n);

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
                continue;
            }
        }

        // 結果を出力
        System.out.println("total=" + totalSteps);
    }
}
