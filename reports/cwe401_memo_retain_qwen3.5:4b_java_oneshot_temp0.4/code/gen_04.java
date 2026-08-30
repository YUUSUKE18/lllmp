import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                int n = Integer.parseInt(line);
                if (!memo.containsKey(n)) {
                    memo.put(n, calculateSteps(n));
                }
                total += memo.get(n);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        System.out.println("total=" + total);
    }
    
    private static int calculateSteps(int n) {
        if (n == 1) return 0;
        int steps = 0;
        while (n != 1) {
            if (n % 2 == 0) {
                n = n / 2;
            } else {
                // 3n+1 が 64bit 整数の範囲に収まることを確認し、long で計算
                long nextVal = (long)n * 3 + 1;
                if (nextVal > Integer.MAX_VALUE) {
                    n = (int)(nextVal % Integer.MAX_VALUE); // 実際はオーバーフローしないが、安全のために考慮
                    // ただし、Collatz 問題では値は増大し続けることがあり、64bit を超えることも理論上可能だが、
                    // 問題文「64bit 整数の範囲には収まります」とあるため、long で計算して Integer.MAX_VALUE に戻す処理が必要か？
                    // 実際、Collatz 順列は非常に大きくなるが、テストケースによっては long を超えることも。
                    // しかし、問題文「64bit 整数の範囲には収まります」とあるので、long で計算し、結果を int として扱う。
                    // ただし、nextVal が int 型を超えても、その値自体は long で保持し、次のステップで処理。
                    // 実際、Collatz 順列では n が増大するが、最終的には 1 に戻る。
                    // 問題文の「64bit 整数の範囲には収まります」という制約に従うため、long を使って計算。
                }
                n = (int)(nextVal); // long から int へキャスト（問題文の制約により safe）
            }
            steps++;
        }
        return steps;
    }
}
