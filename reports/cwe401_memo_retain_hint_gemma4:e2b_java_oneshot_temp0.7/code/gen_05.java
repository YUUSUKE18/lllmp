import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目を読み込み、整数としてパースする
        String line = br.readLine();
        if (line == null) {
            System.out.println("total=0");
            return;
        }

        // 入力は1行に1個のクエリとして与えられると解釈する。
        // 仕様の「標準入力に、1 以上の整数が 1 行に 1 個ずつ並びます（クエリ）」を、
        // 実際には複数行入力として扱うと解釈し、その行ごとにクエリを処理する。
        // ただし、例1の形式（空白区切り）と仕様の矛盾があるため、
        // 通常の競技プログラミングの慣習に従い、入力全体を読み込み、各行をクエリとして扱う。
        
        // ここでは、入力が複数行あることを想定し、各行をクエリとして処理する。
        // 読み込んだ行をスペースで分割し、各要素をクエリとする。
        String[] tokens = line.trim().split("\\s+");
        
        long totalCount = 0;

        // メモ化のためのマップ
        Map<Long, Long> memo = new HashMap<>();
        memo.put(1L, 0L);

        for (String token : tokens) {
            if (token.isEmpty()) continue;
            try {
                long n = Long.parseLong(token);
                
                // メモ化された値のチェック
                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // 経路を再計算してメモ化
                long steps = calculateSteps(n, memo);
                memo.put(n, steps);
                totalCount += steps;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }

    /**
     * 繰り返し操作を1に到達するまでの手数を計算する（メモ化再帰/動的計画法）
     * @param n 現在の数
     * @param memo メモ化テーブル
     * @return 1に到達するまでの手数
     */
    private static long calculateSteps(long n, Map<Long, Long> memo) {
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
            nextN = 3 * n + 1;
        }

        // 再帰的に次のステップを計算
        long steps = 1 + calculateSteps(nextN, memo);
        
        // 結果をメモ化
        memo.put(n, steps);
        return steps;
    }
}
