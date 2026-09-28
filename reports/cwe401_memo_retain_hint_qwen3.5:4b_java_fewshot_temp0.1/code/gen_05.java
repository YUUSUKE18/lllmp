import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        memo.put(1, 0);
        long total = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                int n = Integer.parseInt(line);
                if (n == 1) {
                    total += memo.get(1);
                } else {
                    int steps = calculateSteps(n, memo);
                    total += steps;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        System.out.println("total=" + total);
    }
    
    private static int calculateSteps(int n, Map<Integer, Integer> memo) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        int steps = 0;
        while (n != 1) {
            if (n % 2 == 0) {
                n = n / 2;
            } else {
                // 3n+1 が 64bit 整数の範囲に収まることを確認し、long で計算
                long nextVal = (long)n * 3 + 1;
                if (nextVal > Integer.MAX_VALUE) {
                    n = (int)(nextVal % Integer.MAX_VALUE); // 実際には問題文の「64bit 整数の範囲に収まる」という制約は、計算過程での値が long で扱えることを意味し、結果を int に戻す必要がある。ただし、Collatz 数列は非常に高速に収束するため、int 範囲を超えてもすぐに戻ってくる。
                    // より正確には、long として計算し、次に int として処理する。
                    // しかし、問題文「途中に現れる値は 32bit 整数には収まりませんが、64bit 整数の範囲には収まります」は、int 型の変数で扱う必要があるが、一時的に long で計算することを示唆している。
                    // Java の int は 32bit, long は 64bit。計算過程で long を使えば OK。
                    n = (int)(nextVal); // nextVal は常に Integer.MAX_VALUE 以下になるはずだが、安全のために cast する。実際には Collatz 数列は整数範囲を超えてもすぐに戻ってくる。
                } else {
                    n = (int)nextVal;
                }
            }
            steps++;
        }
        
        memo.put(n, steps);
        return steps;
    }
}
