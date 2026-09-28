import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {

    /**
     * 指定された操作（nが偶数ならn/2、奇数なら3n+1）を繰り返し、1に到達するまでの手数を計算する。
     * 結果はメモ化して高速化する。
     *
     * @param n 開始値 (long)
     * @param memo メモ化された結果のマップ
     * @return nから1に到達するまでの手数。
     */
    private static int calculateSteps(long n, Map<Long, Integer> memo) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long current = n;
        // 現在のパスを追跡するためのリスト（サイクル検出や複雑な経路計算に必要だが、ここでは単純なステップカウントのみ）
        // 標準的なCollatz問題では、ループ検出やサイクル処理が複雑になるが、ここでは1に到達するまでのステップ数を求める。
        // 念のため、計算中に無限ループに陥る可能性を考慮し、最大ステップ数制限を設けることも考えられるが、
        // 問題の仕様は「1に到達するまでの手数」なので、到達することを前提とする。

        int steps = 0;
        // サイクル検出のために、訪問した数とステップ数を記録するマップを用意する
        Map<Long, Integer> path = new HashMap<>();
        path.put(current, 0);
        
        while (current != 1) {
            if (current % 2 == 0) {
                current /= 2;
            } else {
                // 3n + 1 の計算。long型で十分な範囲を考慮する。
                current = 3 * current + 1;
            }
            steps++;

            // メモ化された値が現在のパスに含まれていたら、それを利用してジャンプする
            // ただし、この問題では、nから1への最短経路を求めるため、単純な再帰的なメモ化が最も自然。
            // サイクル検出（行き止まり）を防ぐため、ここで既に計算済みの値があれば利用する。
            if (memo.containsKey(current)) {
                // 既に計算済みの値から、そこから1までのステップ数を加算する
                return memo.get(current) + steps;
            }
            
            // サイクル検出（同じ値が何度も現れる）
            if (path.containsKey(current)) {
                 // サイクルに入った場合、この経路は1に到達しない（または無限ループ）ため、ここではエラーとして扱うか、
                 // 仕様に基づき、到達しないと仮定して処理を終了する（問題の性質上、通常は1に到達すると仮定される）。
                 // Collatz問題では、通常、サイクルに陥った場合、計算が破綻するが、ここでは1に到達することを期待する。
                 // 厳密には、サイクルを検出した時点で計算を中断する。
                 // ここでは、同じ値が再訪された場合は、その経路は無効と見なし、終了する。
                 return -1; // エラーまたは到達不能を示す
            }
            
            path.put(current, steps);
        }

        // 1に到達した場合、その経路のステップ数をメモ化し、返す
        memo.put(n, steps);
        return steps;
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // メモ化用のマップ
        Map<Long, Integer> memo = new HashMap<>();
        long totalSteps = 0;
        String line;

        // 標準入力から行を読み込む
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue; // 空行は無視
            }

            try {
                long n = Long.parseLong(line);
                
                // 1のケースは特別に0ステップ
                if (n == 1) {
                    // 1は既にメモ化されているはずだが、念のため
                    if (!memo.containsKey(1)) {
                        memo.put(1, 0);
                    }
                    // totalSteps += 0;
                    continue;
                }

                // 計算を実行し、結果を得る
                int steps = calculateSteps(n, memo);
                
                if (steps != -1) {
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
