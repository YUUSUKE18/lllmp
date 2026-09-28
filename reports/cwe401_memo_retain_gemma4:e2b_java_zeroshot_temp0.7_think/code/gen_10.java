import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {

    // メモ化された結果を格納するマップ
    private static Map<Long, Long> memo = new HashMap<>();

    /**
     * 開始数 n から 1 に到達するまでの手数を計算する。
     * メモ化を利用する。
     * @param n 開始数
     * @return 手数
     */
    private static long calculateSteps(long n) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long current = n;
        // 経路を追跡するために、現在の経路上のすべての要素を一時的に記録するリスト
        // ただし、今回の問題は単に手数を求めるだけであり、経路自体を再帰的に扱う必要はないため、
        // 単純な反復計算で十分である。
        
        long steps = 0;
        
        // 計算過程をメモ化するために、計算中に訪れたすべての数とその手数を記録する
        // ただし、これは再帰的なメモ化（DP）を行う場合とは異なるため、ここでは単純な反復で計算し、
        // 最終結果のみをメモ化する方針を採用する。
        
        // Collatzの数列を計算
        while (current != 1) {
            if (current % 2 == 0) {
                current /= 2;
            } else {
                // 3n + 1 の計算。nが非常に大きい場合でも64bitで収まる。
                current = 3 * current + 1;
            }
            steps++;
        }

        // 結果をメモ化
        memo.put(n, steps);
        return steps;
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;

        String line;
        // 標準入力から行を読み込む
        while ((line = br.readLine()) != null) {
            // 空行や数値として解釈できない行を無視
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());
                
                // 1 以上の整数であるという制約を満たすか確認
                if (n >= 1) {
                    // 手数を計算し、合計に加算
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
