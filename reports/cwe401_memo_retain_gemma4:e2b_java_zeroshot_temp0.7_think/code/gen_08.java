import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {

    /**
     * 指定された数 n から 1 に到達するまでの手数を計算します。
     * 計算過程で出現する値はメモ化（memo）に保存されます。
     *
     * @param n 開始値
     * @param memo 既に計算済みの結果を格納するマップ
     * @return n から 1 までの手数
     */
    private static long countSteps(long n, Map<Long, Long> memo) {
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
            // 3n + 1
            nextN = 3 * n + 1;
        }

        // 再帰的に次のステップの手数を計算し、現在のステップを加算する
        long steps = 1 + countSteps(nextN, memo);
        
        // 結果をメモ化
        memo.put(n, steps);
        return steps;
    }

    public static void main(String[] args) throws IOException {
        // メモ化のためのマップ。計算結果を格納する。
        Map<Long, Long> memo = new HashMap<>();
        long totalSteps = 0;

        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;

        // 標準入力からクエリを読み込む
        while ((line = br.readLine()) != null) {
            // 空行や数値として解釈できない行を無視
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());
                
                if (n <= 0) {
                    // 仕様では 1 以上の整数が与えられるが、念のため
                    continue;
                }

                // メモ化された結果があればそれを使用
                if (memo.containsKey(n)) {
                    totalSteps += memo.get(n);
                } else {
                    // 新しいクエリの場合、手数を計算し、メモ化する
                    // countSteps関数は、計算過程で自動的にメモを更新する
                    long steps = countSteps(n, memo);
                    totalSteps += steps;
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
