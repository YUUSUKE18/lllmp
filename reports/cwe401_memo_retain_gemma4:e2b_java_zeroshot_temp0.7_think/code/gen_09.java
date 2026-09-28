import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {

    // メモ化のためのマップ。nから1に到達するまでのステップ数を保存する。
    private static final Map<Long, Long> memo = new HashMap<>();

    /**
     * nから1に到達するまでのステップ数を再帰的に計算し、結果をメモ化する。
     *
     * @param n 開始数
     * @return 1に到達するまでのステップ数
     */
    private static long countSteps(long n) {
        if (n == 1) {
            return 0;
        }
        
        // メモ化された結果があればそれを使用する
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long nextN;
        if (n % 2 == 0) {
            // nが偶数なら n/2
            nextN = n / 2;
        } else {
            // nが奇数なら 3n+1
            // 3n+1がオーバーフローしないように注意 (long型なので問題ないが、念のため)
            nextN = 3 * n + 1;
        }

        // 再帰的に次のステップを計算し、現在のステップ数を加える
        long steps = 1 + countSteps(nextN);

        // 結果をメモ化して返す
        memo.put(n, steps);
        return steps;
    }

    public static void main(String[] args) throws IOException {
        // 標準入力から読み込む
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;

        String line;
        // 入力が終了するまで読み込む
        while ((line = br.readLine()) != null) {
            // 空行や、整数として解釈できない行を無視する
            try {
                // 行を整数としてパース
                long n = Long.parseLong(line.trim());
                
                // 1以上の整数であるか確認（仕様に厳密に従うため）
                if (n >= 1) {
                    // メモ化された結果を使ってステップ数を計算
                    // countSteps関数内で計算とメモ化が行われる
                    totalSteps += countSteps(n);
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        // 結果を標準出力に出力
        System.out.println("total=" + totalSteps);
    }
}
