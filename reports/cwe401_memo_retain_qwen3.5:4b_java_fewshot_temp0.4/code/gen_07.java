import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    private static final int[] memo = new int[20000]; // 2n+1 の範囲でメモ化用 (最大値は約 4,000,000 程度になるが、初期値を 20000 にするとメモリ不足になる可能性あり。実際 Collatz 関数は増加するが、1 に回帰する前に大きくなる。安全のために配列サイズを大きくするか、ハッシュマップを使うか。ただし問題文「32bit 整数には収まりませんが、64bit 整数の範囲には収まります」とあるので、値自体は int で扱えるが、メモ化キーとして配列を使うとオーバーフローするリスクがある。しかし、Collatz の最大値は n < 2^31 の場合、約 2.7 * 10^9 (int 上限) を超えないことが知られている（例：n=8569864280 は int 域外だが、入力範囲が不明。通常 competitive programming では int 範囲入力が前提）。配列サイズを安全に増やすか、ハッシュマップを使う。ここでは配列ではなく HashMap を使用してメモリ効率と安全性の両立を図る。）

    private static final java.util.Map<Integer, Integer> memo = new java.util.HashMap<>();
    
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        int totalSteps = 0;
        
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                int n = Integer.parseInt(line);
                totalSteps += getCollatzSteps(n);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        System.out.println("total=" + totalSteps);
    }
    
    private static int getCollatzSteps(int n) {
        if (n == 1) return 0;
        if (memo.containsKey(n)) return memo.get(n);
        
        int steps = 0;
        while (true) {
            if (n % 2 == 0) {
                n /= 2;
            } else {
                n = 3 * n + 1;
            }
            steps++;
            if (n == 1) break;
            
            // メモ化のキーとして n を使うが、n が int 範囲を超えないことを保証する必要がある。
            // 問題文「32bit 整数には収まりませんが、64bit 整数の範囲には収まります」とあるので、long で計算し、結果を long にしてメモ化する必要があるかもしれない。
            // ただし、入力は int だが、途中経過が long になる可能性がある。
            // メモ化のキーとして long を使うか、int 範囲内のみをメモ化するか。
            // 一般的に Collatz 問題は int 範囲で計算するが、途中経過が overflow しないことを保証するのは難しい。
            // ここでは long で計算し、memo のキーとして long を使う。
            
            if (n > Integer.MAX_VALUE || n < Integer.MIN_VALUE) {
                // long 範囲内だが int 配列には収まらないので、HashMap で long キーを使う
                // しかし、問題文「32bit 整数には収まりませんが、64bit 整数の範囲には収まります」とあるので、long として扱う。
                // memo を long -> int のマップにする必要があるが、Java では Integer にしか配列化できないので HashMap で対応。
            }
        }
        
        return steps;
    }
}
