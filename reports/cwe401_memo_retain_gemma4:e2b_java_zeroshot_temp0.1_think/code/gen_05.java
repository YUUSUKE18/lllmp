import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {

    // メモ化のためのキャッシュ
    private static Map<Long, Integer> memo = new HashMap<>();

    /**
     * n から 1 に到達するまでの手数を計算する関数。
     * メモ化を使用して計算を高速化する。
     * @param n 開始数
     * @return 1 に到達するまでのステップ数
     */
    private static int countSteps(long n) {
        if (n == 1) {
            return 0;
        }
        
        // メモ化チェック
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long nextN;
        if (n % 2 == 0) {
            // n が偶数なら n/2
            nextN = n / 2;
        } else {
            // n が奇数なら 3n+1
            // 3n+1 は 64bit の範囲に収まることを前提とする
            nextN = 3 * n + 1;
        }

        // 再帰的に次のステップを計算し、現在のステップ数を加算
        int steps = 1 + countSteps(nextN);

        // 結果をメモ化
        memo.put(n, steps);
        return steps;
    }

    public static void main(String[] args) throws IOException {
        // 標準入力から読み込む
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;

        String line;
        // 標準入力から1行ずつ読み込む
        while ((line = br.readLine()) != null) {
            // 空行や整数として解釈できない行を無視
            try {
                // 行を整数としてパース
                long n = Long.parseLong(line.trim());
                
                if (n >= 1) {
                    // 各クエリについて手数を計算
                    // countSteps関数内でメモ化が実行される
                    totalSteps += countSteps(n);
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        // 結果を出力
        System.out.println("total=" + totalSteps);
    }
}
