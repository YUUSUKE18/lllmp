import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {

    // メモ化のためのマップ (n -> 手数)
    private static Map<Long, Long> memo = new HashMap<>();

    /**
     * n から 1 に到達するまでの手数を計算し、結果をメモ化する。
     * @param n 開始数
     * @return 1 に到達するまでの手数
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
            // 3n+1 が64bitの範囲に収まることを前提とする
            nextN = 3 * n + 1;
        }

        // 再帰的に次のステップを計算し、現在のステップ数を加算する
        long steps = 1 + calculateSteps(nextN);

        // 結果をメモ化
        memo.put(n, steps);
        return steps;
    }

    public static void main(String[] args) throws IOException {
        // 標準入力から読み込む
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSum = 0;

        String line;
        
        // 入力を一行ずつ処理
        while ((line = br.readLine()) != null) {
            // 空行や空白のみの行は無視
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());
                
                if (n >= 1) {
                    // 各クエリについて手数を計算し、合計に加算する
                    // 計算結果は再帰とメモ化によって高速化される
                    totalSum += calculateSteps(n);
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                // 仕様に従い、整数として解釈できない行は無視する
            }
        }

        // 結果を出力
        System.out.println("total=" + totalSum);
    }
}
