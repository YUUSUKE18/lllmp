import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
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
                long n = Long.parseLong(line.trim());
                if (n == 1) {
                    // n=1 のときの手数は 0
                    totalCount += 0;
                    continue;
                }

                // メモ化された値があればそれを使用
                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // 再帰的計算とメモ化（または反復計算）
                // ここでは、再帰ではなく、到達までの手数を求めるため、メモ化された値を使って計算する
                // 実際には、n から 1 に到達するまでの操作の回数を数える問題なので、
                // n が偶数なら n/2、奇数なら 3n+1 を適用し、その過程を数える。
                // 問題文の意図を「n から 1 に到達するまでの操作の回数」と解釈し、
                // これは通常、Collatz予想に関連する問題の変形です。
                // ここでは、nが1になるまでのステップ数を数えます。

                long steps = 0;
                long current = n;
                
                // 計算過程で発生する値のメモ化を併用する
                // ただし、この問題は「n から 1 に到達するまでの手数」を求めるため、
                // 各nに対して直接計算し、その結果を合計します。
                // メモ化は、同じnが再度入力された場合の高速化のためです。
                
                // 再帰的なメモ化（またはDP）で計算
                // 厳密には、nが1になるまでの操作回数を求めるため、
                // 1回のクエリごとに計算し、その結果を合計します。
                
                // メモ化を再計算として使用する場合、
                // n から 1 へのパスを辿り、途中の値が既に計算済みならそれを利用する。
                
                // 簡略化のため、ここでは各クエリで直接計算し、メモ化は結果を保存するのに使用します。
                // ただし、問題文の「同じ整数が繰り返し現れるので、計算結果をメモ化して高速化してください」
                // は、入力ストリーム全体を通じて同じ値が再出現した場合に適用されるべきです。
                
                // 以下の計算は、nが1になるまでのステップ数を数える標準的な方法です。
                while (current != 1) {
                    if (current <= 0) break; // 負の数やゼロは無視（問題文では1以上の整数が入力される前提だが念のため）
                    
                    if (current % 2 == 0) {
                        current = current / 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    steps++;
                }
                
                totalCount += steps;
                memo.put(n, steps);

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
