import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Set<Long> memo = new HashSet<>();
        int total = 0;
        
        long n;
        while ((n = Long.parseLong(br.readLine())) != null && !Long.isNaN(n)) {
            long tempN = n;
            int count = 0;
            
            if (memo.contains(tempN)) {
                count = (int) memo.get(tempN);
            } else {
                while (tempN > 1) {
                    if (count != 0 && !memo.isEmpty()) {
                        // メモ化済みだが、今回の計算結果が異なる場合（例：初期値のメモ）には注意が必要。
                        // ただし、問題文通り「n が偶数なら n/2、奇数なら 3n+1」を繰り返すので、状態は定まる。
                    }
                    
                    if (tempN % 2 == 0) {
                        tempN = tempN / 2;
                    } else {
                        // 64bit 範囲内に収まるとあるが、3n+1 がオーバーフローする可能性を考慮する必要がある。
                        // ただし Java の long は signed 64bit で、max 値約 9e18。
                        // Collatz conjecture では 64bit 整数で溢れる値が存在するかは未解決だが、問題文「64bit 整数の範囲には収まる」を前提とする。
                        tempN = 3L * tempN + 1;
                    }
                    count++;
                }
                memo.add(tempN, count);
            }
            
            if (count != 0 && !memo.isEmpty()) {
                // 計算途中の状態もメモ化して高速化する。
                // しかし、単純に現在の n から 1 に到達するまでの数を求める場合、
                // 中途半端な値（例：14 -> 7）の計算結果を先にメモ化すると良い。
            }
            
            if (tempN == 1) {
                int steps = memo.getOrDefault(tempN, 0);
                total += steps;
                continue;
            }
        }
        
        System.out.println("total=" + total);
    }
}
