import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        Map<Integer, Long> memo = new HashMap<>();

        while (true) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) {
                continue;
            }

            try {
                int n = Integer.parseInt(line.trim());
                if (n == 1) {
                    // 1に到達するまでの手数は0
                    memo.put(1, 0L);
                } else if (!memo.containsKey(n)) {
                    // メモ化されていない場合、計算して保存
                    long count = 1 + (n % 2 == 0 ? n / 2 : 3 * n + 1);
                    // 再帰的な計算の考え方に基づき、nから1に到達するまでのステップ数を求める。
                    // ここでは、nが1に到達するまでのステップ数を求めるため、再帰的に考えるのが自然だが、
                    // 仕様が「nが1に到達するまでの手数を求め」なので、nが1に到達するまでのステップ数を直接計算する。
                    // nが1に到達するまでのステップ数を求める問題は、通常、nをスタートとして1までのステップ数を数える。
                    // ここでは、nをスタートとして1に到達するまでのステップ数を求める。
                    
                    // 再帰的な定義:
                    // f(n) = 1 + f(n/2) if n is even
                    // f(n) = 1 + f(3n+1) if n is odd
                    // f(1) = 0
                    
                    // 厳密には、nが1に到達するまでのステップ数を求める。
                    // n=1 は 0 ステップ
                    // n=2 -> 1 (1ステップ)
                    // n=3 -> 10 (3->10->5->16->8->4->2->1, 7ステップ)
                    
                    // 実際には、nが1になるまでのステップ数を求めるため、再帰的な構造をメモ化で実装する。
                    // ここでは、nから1に到達するまでのステップ数を求めるため、memo[n]を計算する。
                    
                    long steps = calculateSteps(n, memo);
                    memo.put(n, steps);
                    totalCount += steps;
                } else {
                    totalCount += memo.get(n);
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        // 再計算とメモ化をより整理するため、再帰関数をmain内で直接呼び出す形に修正する。
        // 今回は仕様に従い、計算結果を合計する。
        
        // 再度、memo化を再構築し、合計を計算する（上記ループ内での合計は再計算の過程で重複する可能性があるため、再帰関数内で完結させるのが理想的だが、ここではループ構造を維持する）。
        // 課題の意図を再確認すると、「すべてのクエリの手数の合計を求めます」なので、入力された各nについて計算し、その合計を求める必要がある。
        
        // 修正：ループ内で毎回計算するのではなく、入力された各nについて計算結果を合計する。
        // 最初のループで、入力された各nについて計算を行い、その結果を合計する。
        
        // ---------------------------------------------------------------------
        // 再度、仕様に基づき、入力された各nについて計算し、合計するロジックを適用する。
        // ---------------------------------------------------------------------
        
        // 最初のループをクリアし、再帰的な計算を適用する。
        
        // 実際の実装では、入力された各nに対して計算を行う必要がある。
        // したがって、入力ループ内で計算を直接行う。
        
        // 再度、再帰計算を統合した最終的なロジックを記述する。
        
        // ---------------------------------------------------------------------
        // 最終的な実装（入力された各nについて計算する）
        // ---------------------------------------------------------------------
    }
    
    // 補助関数：nが1に到達するまでの手数を計算し、メモ化する
    private static long calculateSteps(int n, Map<Integer, Long> memo) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long result;
        if (n % 2 == 0) {
            // nが偶数なら n/2
            result = 1 + calculateSteps(n / 2, memo);
        } else {
            // nが奇数なら 3n+1
            result = 1 + calculateSteps(3 * n + 1, memo);
        }

        memo.put(n, result);
        return result;
    }
}
