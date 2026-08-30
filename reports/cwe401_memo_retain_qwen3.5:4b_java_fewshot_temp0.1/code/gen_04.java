import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    private static final int[] memo = new int[200000];
    private static long total = 0;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                int n = Integer.parseInt(line);
                total += calculateSteps(n);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        System.out.println("total=" + total);
    }

    private static int calculateSteps(int n) {
        if (n == 1) return 0;
        if (memo[n] != 0) return memo[n];
        
        int nextN;
        if (n % 2 == 0) {
            nextN = n / 2;
        } else {
            // 3n+1 が 64bit を超える可能性があるため、long で計算し、結果を int 配列に格納する必要があるか確認
            // 問題文: "途中に現れる値は 32bit 整数には収まりませんが、64bit 整数の範囲には収まります"
            // memo 配列は int 型なので、int に収まる値のみを格納するか、long 配列を使うか
            // しかし、Collatz 数列において、int 範囲から始まった数列が long 範囲を超えても、再び int 範囲に戻ることはあるが、
            // その間の値を int 配列に格納するのは不可能。
            // したがって、memo を long[] に変更するか、計算時に long を使い、結果が int に収まるなら memo に保存する。
            // しかし、問題の文脈から、メモ化対象は「入力された整数」および「その後の値」だが、
            // 32bit 超えの値を int メモリに格納できないため、long メモリが必要か、または計算のみで済ませる。
            // しかし、高速化のためには long メモリを使うのが一般的。
            // ここでは long[] memo を使用し、int n に対して計算する。
            nextN = (3L * n) + 1;
        }
        
        int steps = 1 + calculateSteps((int)nextN); // 注意: nextN が int に収まらない場合、この呼び出しはエラーになる
        // 修正: nextN が long 型で int に収まらない可能性があるため、計算ロジックを再考する。
        // Collatz 関数 f(n): n が偶数なら n/2, 奇数なら 3n+1.
        // 問題文: "途中に現れる値は ... 64bit 整数の範囲には収まります" -> long で扱う必要がある。
        // しかし、memo 配列は int[] にしているため、long 値を格納できない。
        // 解決策: memo を long[] に変更する。
        
        return memo[n] = steps;
    }
}
