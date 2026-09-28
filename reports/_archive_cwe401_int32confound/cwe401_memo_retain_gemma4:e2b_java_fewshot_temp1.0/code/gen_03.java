import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long total = 0;
        Map<Integer, Long> memo = new HashMap<>();

        while (true) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) {
                continue;
            }

            try {
                int n = Integer.parseInt(line.trim());

                if (n == 1) {
                    // Base case: n=1の手数は0
                    // ここでの計算は、元の問題の操作を反復適用する過程で発生する遷移のコストを問うものと解釈し、
                    // 実際の手数計算を実装する。
                    // n=1の手数は0。
                    // 遷移を遡って計算する必要があるが、ここでは直接、nから1に到達するまでのステップ数を求める。
                    // 遷移: n (n/2 if even, 3n+1 if odd)
                    // 逆操作 (x):
                    // もし x = y/2 (yは偶数): x の遷移先は 2x (偶数なら) または 2x+1 (奇数なら)
                    // もし x = (y-1)/3 (yは1で割った余りが1): x の遷移先は 2x (偶数なら) または 3x+1 (奇数なら)
                    
                    // ここでは、標準的な「3n+1問題」の逆操作とメモ化を適用する。
                    // 求めるのは n から 1 に到達するまでの操作回数。
                    // 操作:
                    // if n % 2 == 0: n = n / 2
                    // else: n = 3 * n + 1
                    
                    // 逆操作（xからnへの遷移）を考えると、メモ化はnから1への到達時間を計算するのに適している。
                    // n=1の時間は0。
                    memo.put(1, 0L);
                    
                    // 再帰的に計算するのではなく、nが与えられたときの逆操作を考えて、1への経路を辿る。
                    // しかし、この問題は「nから1に到達するまでの手数」を問うため、nを初期値として再帰的に計算するのが自然。
                    
                    // nが与えられたときの操作をシミュレーションする関数を定義する。
                    long steps = calculateSteps(n, memo);
                    total += steps;

                } else {
                    // 計算が必要な場合
                    long steps = calculateSteps(n, memo);
                    total += steps;
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + total);
    }

    /**
     * n から 1 に到達するまでの手数を再帰的・メモ化的に計算する。
     * @param n 現在の数
     * @param memo メモ化テーブル
     * @return n から 1 への手数
     */
    private static long calculateSteps(int n, Map<Integer, Long> memo) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long steps;
        if (n % 2 == 0) {
            // n が偶数 -> n/2 に遷移。これは逆操作では 2n や 2n-1 に対応するが、
            // 求めるのは n から 1 への経路なので、操作をそのまま適用して進む。
            // 実際には、nがどのような操作の「結果」であるかを考える必要がある。
            // 3n+1問題では、nが1に到達するまでの操作回数を求める。
            
            // nが偶数なら n/2 に遷移する。
            steps = 1 + calculateSteps(n / 2, memo);
        } else {
            // n が奇数 -> 3n+1 に遷移する。
            steps = 1 + calculateSteps(3 * n + 1, memo);
        }

        memo.put(n, steps);
        return steps;
    }
}
