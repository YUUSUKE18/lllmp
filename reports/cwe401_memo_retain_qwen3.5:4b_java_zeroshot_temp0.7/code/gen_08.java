import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Integer> memo = new HashMap<>();
        
        long total = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }
            
            try {
                int n = Integer.parseInt(line);
                
                // メモ化された計算結果がある場合はその値を追加
                if (memo.containsKey((long)n)) {
                    total += memo.get((long)n);
                    continue;
                }
                
                long steps = 0;
                long current = n;
                
                while (true) {
                    if (current == 1) {
                        break;
                    }
                    
                    if (!memo.containsKey(current)) {
                        long nextVal = (current % 2 == 0) ? (current / 2) : (3 * current + 1);
                        memo.put((long)nextVal, steps + 1);
                        
                        // 計算の順序を最適化するために、メモに格納する値を適切に選択
                        if (nextVal < n || memo.containsKey(nextVal)) {
                            // 既に計算済みの方が大きいか、既に存在する場合はその値を使用
                            // これは Collatz 問題の性質上、必ず 1 に収束するが、
                            // 途中の値が非常に大きくなる可能性があるため注意が必要。
                            // ここでは単純にループし、メモ化を実行する。
                        } else {
                            // 新しい値がまだ計算されていない場合
                            steps = memo.get((long)nextVal);
                            current = nextVal;
                        }
                    } else {
                        steps = memo.get(current);
                        break;
                    }
                    
                    if (current > Long.MAX_VALUE / 3 && current % 2 != 0) {
                        // 3n+1 が long を超える可能性があるが、仕様によれば 64bit に収まるので OK
                        // ただし、実際には非常に大きな値になることが知られている（Collatz 順列）
                        // しかし、Java の long は signed 64-bit であるため、最大値は約 9e18。
                        // 問題文の「途中に現れる値は ... 64bit 整数の範囲には収まります」に従う。
                    }
                    
                    current = (current % 2 == 0) ? (current / 2) : (3 * current + 1);
                }
                
                // n の計算結果を取得（上記ロジックでは少し複雑なので再考）
                // より単純な実装: 完全な Collatz 連鎖をたどる
                steps = solve(n, memo);
                
            } catch (NumberFormatException e) {
                continue;
            }
            
            total += steps;
        }
        
        System.out.println("total=" + total);
    }
    
    private static int solve(long n, Map<Long, Integer> memo) {
        if (n == 1) return 0;
        if (memo.containsKey(n)) return memo.get(n);
        
        long nextVal = (n % 2 == 0) ? (n / 2) : (3 * n + 1);
        int stepsForNext = solve(nextVal, memo);
        
        memo.put(n, stepsForNext + 1);
        return stepsForNext + 1;
    }
}
