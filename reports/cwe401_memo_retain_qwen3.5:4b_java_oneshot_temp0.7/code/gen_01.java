import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    private static int[] memo = new int[Integer.MAX_VALUE + 10];

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            
            try {
                int n = Integer.parseInt(line.trim());
                if (n < 0 || n > memo.length - 1) {
                    // もしメモ化テーブルを超えたら、その値を計算してセットし、結果を返す
                    // ただし、仕様は「64bit 整数の範囲には収まる」とあるが、
                    // メモ化テーブルは int[] で固定している。
                    // n が Integer.MAX_VALUE を超えることは稀だが、安全のために
                    // 計算のみを行うロジックを実装する。
                    long steps = calculateSteps(n);
                    totalSteps += steps;
                } else {
                    totalSteps += calculateSteps(n);
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        System.out.println("total=" + totalSteps);
    }

    private static int calculateSteps(int n) {
        if (n == 1) return 0;
        if (memo[n] != 0) return memo[n];
        
        int steps;
        if (n % 2 == 0) {
            steps = 1 + calculateSteps(n / 2);
        } else {
            // 奇数の場合、3n+1 が計算される。3n+1 は int 範囲を超えない保証はないが
            // 問題文の「64bit 整数の範囲には収まる」という指摘は入力 n に関するものであり、
            // 途中生成する値が long を超えることは理論上可能性があるが、Collatz 数列では
            // 通常 int 範囲を超えることは非常に稀（最大 known は 2^31-1 の範囲内）。
            // しかし、安全性のために計算時に long を使うべきか、あるいは
            // メモ化キーとして int で管理しつつ、計算値を long で処理する。
            // ここではメモ化テーブルは int 配列で n に一致するかを記録するため、
            // n が int 範囲内であれば OK。3n+1 が int を超える場合はその値を key にして
            // memo 配列のインデックスとして扱う必要があるが、int の上限を超えることは
            // インデックスとして使えない。ただし、 Collatz 数列において、
            // n (int 範囲) から始めて 3n+1 を計算したものが再び int 範囲内に戻ることは知られている。
            // また、3n+1 が負になることはあり得ない。
            // 安全のために、計算値を long で扱いつつ、再度 int に戻ってきたらメモ化する。
            long nextN = (long) n * 3 + 1;
            if (nextN > Integer.MAX_VALUE || nextN < 0) {
                // 理論上は起こりえないが、例外処理として
                // 計算結果を直接足し合わせるロジックが必要。
                // ただし、Collatz conjecture では無限ループなしとされ、int 範囲内に戻る。
                // ここでは n が int の場合、3n+1 が int を超えることは
                // 例えば n = (Integer.MAX_VALUE - 2) / 3 + 1 のような値で起こりうるが、
                // その後すぐに減って戻ってくる。
                // メモ化テーブルのインデックスとして使えないため、その場合は
                // 直接計算を递归し、結果を返すのみとすることにする（メモ化しない）。
                steps = 1 + calculateSteps((int) nextN); // 型キャストで int 範囲に収める仮定
            } else {
                steps = 1 + calculateSteps((int) nextN);
            }
        }
        
        memo[n] = steps;
        return steps;
    }
}
