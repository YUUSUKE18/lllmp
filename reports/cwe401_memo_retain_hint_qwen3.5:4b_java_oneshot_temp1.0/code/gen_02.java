import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

public class Main {
    private static Map<Long, Long> memo = new HashMap<>();

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long total = 0;
        
        while (true) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) {
                break;
            }
            
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) {
                try {
                    long n = Long.parseLong(st.nextToken());
                    total += calculateSteps(n);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行やトークルは無視
                }
            }
        }
        
        System.out.println("total=" + total);
    }

    private static long calculateSteps(long n) {
        if (n <= 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        long steps;
        boolean isEven = (n % 2 == 0);
        if (isEven) {
            steps = 1 + calculateSteps(n / 2);
        } else {
            // Collatz 問題では値が非常に大きくなる可能性があるため、long 範囲を超えないことを確認する必要がある。
            // 一般的な入力に対して long は十分であるとする前提で行うが、overflow を考慮してチェックは重要。
            // 本課題の「64bit 整数の範囲には収まります」という制約下では overflow は発生しない assumed.
            steps = 1 + calculateSteps(3 * n + 1);
        }
        
        memo.put(n, steps);
        return steps;
    }
}
