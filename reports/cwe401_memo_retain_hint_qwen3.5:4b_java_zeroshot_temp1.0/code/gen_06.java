import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Long> memo = new HashMap<>();
        long totalSteps = 0;
        
        String line;
        try {
            while ((line = reader.readLine()) != null) {
                if (line.trim().isEmpty()) {
                    continue;
                }
                
                try {
                    long n = Long.parseLong(line.trim());
                    
                    // メモ化計算を実行
                    totalSteps += calculateCollatz(n, memo);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        System.out.println("total=" + totalSteps);
    }
    
    private static long calculateCollatz(long n, Map<Long, Long> memo) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        long steps;
        if (n == 1) {
            steps = 0;
        } else if (n % 2 == 0) {
            steps = 1 + calculateCollatz(n / 2, memo);
        } else {
            // 3n+1 の結果は long の範囲内にある場合があるが、Java の long(64bit sign 幅) は約 9e18 まで収まり、
            // Collatz 数列で出現する最大値は実用的な入力範囲（n <= 2*10^9 など）であれば長寿命 (long) で覆える。
            // ストレステストなどで極端な場合ありとして、問題文通り 64bit integer の範囲と仮定して実装する。
            steps = 1 + calculateCollatz(3 * n + 1, memo);
        }
        
        memo.put(n, steps);
        return steps;
    }
}
