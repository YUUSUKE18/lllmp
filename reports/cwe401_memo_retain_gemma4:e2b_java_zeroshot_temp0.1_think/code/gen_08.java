import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {

    // メモ化のためのマップ。キー: 元の数, 値: 1に到達するまでの手数
    private static Map<Long, Long> memo = new HashMap<>();

    /**
     * 与えられた数 n が 1 に到達するまでの手数を計算する。
     * メモ化を利用する。
     * @param n 開始数
     * @return 手数
     */
    private static long calculateSteps(long n) {
        if (n == 1) {
            return 0;
        }
        
        // メモがあればそれを返す
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long result;
        
        // n が偶数なら n/2
        if (n % 2 == 0) {
            result = 1 + calculateSteps(n / 2);
        } 
        // n が奇数なら 3n+1
        else {
            // 3n + 1 の計算。long型で十分収まることを前提とする。
            result = 1 + calculateSteps(3 * n + 1);
        }

        // 結果をメモ化して返す
        memo.put(n, result);
        return result;
    }

    public static void main(String[] args) throws IOException {
        // 標準入力から読み込む
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;
        String line;

        // 入力を一行ずつ読み込む
        while ((line = br.readLine()) != null) {
            // 空行や整数として解釈できない行を無視する
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());
                
                // クエリ n について手数を計算し、合計に加算する
                if (n >= 1) {
                    // calculateSteps関数は再帰的に動作し、メモ化を行う
                    totalSteps += calculateSteps(n);
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
