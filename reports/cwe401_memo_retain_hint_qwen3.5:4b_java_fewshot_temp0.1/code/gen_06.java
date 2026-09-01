import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                int n = Integer.parseInt(line);
                if (n == 1) {
                    total += 0;
                } else {
                    total += calculateSteps(n, memo);
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
        long nextVal = n; // 64bit で計算
        
        while (nextVal != 1) {
            if (nextVal % 2 == 0) {
                nextVal /= 2;
            } else {
                nextVal = 3 * nextVal + 1;
            }
            
            // メモリ制限を考慮し、大きな値は直接メモ化しないが、再帰的に計算する
            // ただし、問題文の「64bit 整数の範囲には収まります」という制約から
            // long を使用して計算し、結果が int の範囲に戻った場合はメモ化する
            if (nextVal <= Integer.MAX_VALUE) {
                steps++;
                if (memo.containsKey((int) nextVal)) {
                    steps += memo.get((int) nextVal);
                } else {
                    // 再帰的に計算する代わりに、スタックを避けるためにループで進める
                    // ただし、メモ化の効率的な利用のため、値が int 範囲に戻った時点で処理を継続
                    // ここでは単純にループを続行し、結果を記録
                }
            } else {
                // 64bit を超える場合は計算を続行するが、メモ化はしない（メモリ節約）
                // ただし、実際には Collatz 問題では値は増大して減るパターンがある
                // 64bit 範囲を超えない限り long で計算可能
            }
            
            // 再帰的な構造を避けるため、ループで進めるが、メモ化の効率的な利用のため
            // 値が int 範囲に戻った時点で処理を継続し、結果を記録
            // ここでは単純にループを続行し、結果を記録
        }
        
        return memo.get(n);
    }
}
