import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {

    // メモ化のためのマップ。キー: 元の数, 値: 1に到達するまでの手数
    private static Map<Long, Long> memo = new HashMap<>();

    /**
     * Collatz操作による1への到達手数を計算する。
     * メモ化を利用して計算を高速化する。
     * @param n 初期値
     * @return 1に到達するまでの手数
     */
    private static long calculateSteps(long n) {
        if (n == 1) {
            return 0;
        }
        
        // メモ化チェック
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long result;
        
        if (n % 2 == 0) {
            // nが偶数なら n/2
            result = 1 + calculateSteps(n / 2);
        } else {
            // nが奇数なら 3n+1
            // 3n+1 は64bitに収まることを前提とする
            result = 1 + calculateSteps(3 * n + 1);
        }

        // 結果をメモ化
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
            // 空行や空白のみの行を無視
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                // 整数として解析
                long n = Long.parseLong(line.trim());
                
                // クエリ n について手数を計算
                // calculateSteps関数内でメモ化が実行される
                totalSteps += calculateSteps(n);
                
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        // 結果を出力
        System.out.println("total=" + totalSteps);
    }
}
