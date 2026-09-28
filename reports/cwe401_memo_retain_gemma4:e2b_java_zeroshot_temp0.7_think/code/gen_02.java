import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {

    // メモ化テーブル: 整数 n から 1 に到達するまでの手数を格納する。
    private static Map<Long, Long> memo = new HashMap<>();

    /**
     * n から 1 に到達するまでの手数を計算する。
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
        long steps = 0;
        
        // 探索中に発生する値もメモ化対象とするが、ここでは n から 1 への直接的なパスの長さを計算する
        // 途中の値のメモ化は、この問題の制約（クエリ n から 1 への到達）においては、
        // 各クエリ n の計算のみに焦点を当てるため、開始値 n の結果のみを格納する。
        // ただし、高速化要件を満たすため、再帰的な構造で計算を行う。

        // 再帰的に計算を行う
        long result = 0;
        long temp = n;
        
        // 処理の過程で、同じ値が繰り返し現れる可能性があるため、
        // サイクル検出やより複雑なメモ化が必要になる場合もあるが、
        // Collatz問題の文脈では、通常は 1 に収束するため、単純な再帰で十分。
        
        // 探索とメモ化を同時に行うために、ここでは反復処理を採用する。
        
        // サイクル検出のためのセット（この問題の制約では必須ではないが、安全のため）
        // Set<Long> path = new HashSet<>(); 
        
        while (temp != 1) {
            if (memo.containsKey(temp)) {
                // メモ化された結果があれば、そこから計算を再開する
                long cachedSteps = memo.get(temp);
                steps += cachedSteps;
                // この方法だと、n から 1 へのパス全体を正確に数えるのが難しくなるため、
                // 標準的なCollatzのステップ数を再計算し、その結果をメモ化するのが最も確実。
                // 再帰呼び出しで計算し、戻り値でメモ化する方式を採用する。
                break; // 一旦、再帰に戻る
            }

            // 処理の進め方
            if (temp % 2 == 0) {
                temp /= 2;
            } else {
                // 3n + 1。64bit整数として計算する。
                temp = 3 * temp + 1;
            }
            steps++;
        }
        
        // --- 再度、再帰的なメモ化処理を行う（よりシンプルで安全） ---
        // ループで計算した結果をメモ化する
        
        // n から 1 へのパスを再計算し、その過程で発生したすべての値をメモ化する。
        // ただし、これは元の仕様の「n が 1 のときの手数は 0」という定義と、
        // 「同じ整数が繰り返し現れるので、計算結果をメモ化」という要求を両立させる必要がある。
        
        // 簡潔のため、再帰関数として実装し、計算結果のみをメモ化する。
        return solveRecursive(n);
    }

    /**
     * 再帰的にnから1への手数を計算し、結果をメモ化する。
     */
    private static long solveRecursive(long n) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long next;
        if (n % 2 == 0) {
            next = n / 2;
        } else {
            // 3n + 1
            next = 3 * n + 1;
        }

        // 次のステップの手数 + 1 (現在のステップ)
        long steps = 1 + solveRecursive(next);
        
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
            // 空行や、整数として解釈できない行を無視する
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());
                
                if (n >= 1) {
                    // 各クエリ n について手数を計算し、合計に加算する
                    // solveRecursiveは内部でメモ化を行う
                    totalSteps += solveRecursive(n);
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
