import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {

    // メモ化のためのマップ。キー: 入力値, バリュー: 1に到達するまでの手数
    private static Map<Long, Integer> memo = new HashMap<>();

    /**
     * n が 1 に到達するまでの手数を計算する。
     * メモ化を利用して計算を高速化する。
     * @param n 開始値
     * @return 手数
     */
    private static int countSteps(long n) {
        if (n == 1) {
            return 0;
        }
        
        // メモ化チェック
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        int steps;
        
        // n が偶数なら n/2
        if (n % 2 == 0) {
            steps = countSteps(n / 2);
        } 
        // n が奇数なら 3n + 1
        else {
            // 3n + 1 の計算。nが64bitの範囲内であれば、3n+1も64bitの範囲内。
            // ただし、再帰の深さや結果の合計が32bitに収まることを前提とする。
            steps = 1 + countSteps(3 * n + 1);
        }

        // 結果をメモ化して返す
        memo.put(n, steps);
        return steps;
    }

    public static void main(String[] args) throws IOException {
        // 標準入力からデータを読み込む
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;

        String line;
        
        // 標準入力から行を読み込む
        while ((line = br.readLine()) != null) {
            // 空行や整数として解釈できない行を無視する
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                // 入力された文字列を Long に変換する
                long n = Long.parseLong(line.trim());
                
                // 1以上の整数であるか確認
                if (n >= 1) {
                    // 計算を実行し、結果を合計に加える
                    // countSteps関数は再帰的に動作し、メモ化を利用する
                    totalSteps += countSteps(n);
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
                continue;
            }
        }

        // 結果を標準出力に出力
        System.out.println("total=" + totalSteps);
    }
}
