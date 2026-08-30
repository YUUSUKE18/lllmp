import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        Map<Long, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            try {
                // 空行を無視
                if (line.trim().isEmpty()) {
                    continue;
                }
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // n=1 の場合は手数は 0
                    // memo.put(1L, 0L); // 既にこの値が計算済みであればスキップ（ここでは計算過程で必要になるため、後で計算して記録）
                    continue;
                }

                // メモ化された値があればそれを使用
                if (memo.containsKey(n)) {
                    long count = memo.get(n);
                    totalCount += count;
                    continue;
                }

                // 再帰/メモ化再帰的に計算
                // n が偶数なら n/2, 奇数なら 3n+1
                long result;
                if (n % 2 == 0) {
                    result = n / 2;
                } else {
                    result = 3 * n + 1;
                }

                // 再帰的に呼び出す（再帰ではなく、直接メモ化を利用した計算）
                // ただし、問題の指示は「1 に到達するまでの手数を求める」なので、
                // 通常のCollatz問題の解法（n -> f(n) -> f(f(n)) ... 1 に到達するまでのステップ数）を意味すると解釈します。

                // ここでは、手数を計算するために、現在のnから1に到達するまでのステップ数を再帰的に計算します。
                // メモ化は、各nから1への最短経路を求めるために使います。

                long steps = 0;
                long current = n;
                
                // 再帰的な計算とメモ化を組み合わせる
                // この問題は、各クエリ n について、nから1への経路の長さを求めるものです。
                // 標準的なCollatz問題の計算方法に従い、到達までのステップ数を計算します。
                
                // 経路を追跡するための再帰（または反復）
                // この問題の要求は、nから1に到達するまでの操作の回数です。
                
                // 計算を始める前に、nを1にするまでのステップ数を計算します。
                // この計算は、すでにmemoに存在しない場合にのみ行います。
                
                // 簡略化のため、到達するまでのパスを追跡し、メモ化に保存します。
                
                // 1 から n へのパスを計算するのではなく、n から 1 へのパスを計算します。
                
                // ここで、memo化を「nから1へのステップ数」として利用します。
                // ただし、この問題は通常、各クエリが独立して実行されるため、
                // nが与えられたときに、その経路をたどる必要があります。
                
                // 念のため、現在のnから1へのステップ数を計算し、memoに保存します。
                
                // 再帰的なメモ化計算の実装 (到達するまでのステップ数)
                long tempN = n;
                long countForN = 0;
                Map<Long, Long> path = new HashMap<>(); // 現在のパスを追跡
                
                // スタックベースで計算し、サイクル（同じ数に戻る）を検出するが、
                // Collatz問題は必ず1に収束するため、単純な再帰で十分なことが多い。
                
                // 単純なステップ計算を試みる（メモ化を利用）
                
                long currentStep = 0;
                long currentVal = n;
                
                // ループ内でメモ化を利用して計算を続行します。
                // 1に到達するまでのステップ数を計算するために、ここでは再帰的な構造をシミュレートします。
                
                // 既にmemoに n があれば、その値を加算して終了します。
                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                } else {
                    // 計算が必要な場合
                    // 経路をたどって到達するまでのステップ数を計算する。
                    // ここでは、nを1にするまでのパスを探索します。
                    
                    // 暫定的に、nから1への経路を探索する再帰関数を定義します。
                    // memoの更新は、この関数内で一括で行います。
                    
                    long stepsToOne = calculateSteps(n, memo);
                    totalCount += stepsToOne;
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視（仕様通り）
            }
        }

        // 最終結果の出力
        System.out.println("total=" + totalCount);
    }

    /**
     * n から 1 に到達するまでのステップ数を再帰的に計算し、memoに保存する。
     * @param n 現在の数
     * @param memo メモ化テーブル
     * @return n から 1 へのステップ数
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
            nextN = n / 2;
        } else {
            nextN = 3 * n + 1;
        }

        // 再帰的に次のステップを計算し、現在のステップ数を加算
        long steps = 1 + calculateSteps(nextN, memo);

        // メモ化
        memo.put(n, steps);
        return steps;
    }
}
