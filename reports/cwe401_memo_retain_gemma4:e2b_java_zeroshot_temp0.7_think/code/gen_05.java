import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {

    // メモ化のためのマップ。キー: 開始値, 値: 1に到達するまでの手数
    private static Map<Long, Long> memo = new HashMap<>();

    /**
     * n が 1 に到達するまでの手数を計算する関数。
     * メモ化を利用する。
     * @param n 開始値
     * @return 手数
     */
    private static long calculateSteps(long n) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long nextN;
        if (n % 2 == 0) {
            // n が偶数なら n/2
            nextN = n / 2;
        } else {
            // n が奇数なら 3n+1
            // 3n+1 は64bitの範囲に収まることを前提とする。
            nextN = 3 * n + 1;
        }

        // 再帰的に次のステップの手数を計算し、現在のステップを加える
        long steps = 1 + calculateSteps(nextN);
        
        // 結果をメモ化
        memo.put(n, steps);
        return steps;
    }

    public static void main(String[] args) {
        // 標準入力から読み込む
        try (BufferedReader br = new BufferedReader(new InputStreamReader(System.in))) {
            long totalSum = 0;
            String line;

            // 入力を一行ずつ読み込む
            while ((line = br.readLine()) != null) {
                // 空行や数値として解釈できない行は無視
                if (line.trim().isEmpty()) {
                    continue;
                }

                try {
                    long n = Long.parseLong(line.trim());
                    
                    // 1以上であることのチェック
                    if (n >= 1) {
                        // 各クエリに対してステップ数を計算し、合計に加算する
                        // calculateSteps関数内で再帰とメモ化が行われる
                        totalSum += calculateSteps(n);
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視
                    continue;
                }
            }

            // 結果を標準出力に出力
            System.out.println("total=" + totalSum);

        } catch (IOException e) {
            // 入力エラーが発生した場合の処理
            // 通常、競技プログラミング環境ではこの部分は省略されることが多いが、念のため
        }
    }
}
