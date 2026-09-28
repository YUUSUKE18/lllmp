import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    private static final Map<Long, Integer> memo = new HashMap<>();

    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;

        String line;
        while ((line = reader.readLine()) != null) {
            try {
                // 空行や整数でない行は無視する
                if (line.trim().isEmpty() || !line.matches("-?[0-9]+")) {
                    continue;
                }
                
                long n = Long.parseLong(line.trim());

                // メモ化された値があるか確認
                if (memo.containsKey(n)) {
                    totalSteps += memo.get(n);
                } else {
                    int steps = calculateSteps(n);
                    memo.put(n, steps);
                    totalSteps += steps;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない場合は無視
            }
        }

        System.out.println("total=" + totalSteps);
    }

    private static int calculateSteps(long n) {
        if (n == 1) {
            return 0;
        }
        long nextVal;
        int steps = 0;
        
        while (n != 1) {
            steps++;
            if (n % 2 == 0) {
                n = n / 2;
            } else {
                n = 3 * n + 1;
            }
            
            // 64bit 整数の範囲を超える可能性は、Collatz シーケンスにおいて実質的にあり得ないが、
            // long の上限を超えても計算を続行するロジックが必要。
            // しかし、問題文では「64bit 整数の範囲には収まります」と保証されているため、
            // long で処理可能とみなす。それでも万一越えた場合は例外が発生する可能性がありますが、
            // 仕様通りに実装する。
            if (n > Long.MAX_VALUE) {
                // 理論上発生しないケースだが、防御的に扱う
                throw new ArithmeticException("Collatz sequence exceeds long range");
            }
        }
        
        return steps;
    }
}
