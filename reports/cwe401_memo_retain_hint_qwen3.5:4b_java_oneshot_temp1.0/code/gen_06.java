import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Long> memo = new HashMap<>();
        long totalSteps = 0;

        while (true) {
            String line = br.readLine();
            if (line == null) {
                break;
            }
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line);
                
                // 初期値チェック (n=1 の場合の手数は0)
                totalSteps += steps(n, memo);
                
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalSteps);
    }

    private static long steps(long n, Map<Long, Long> memo) {
        if (n == 1) {
            return 0;
        }
        
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long nextVal, nextSteps;
        if (n % 2 == 0) {
            nextVal = n / 2;
        } else {
            nextVal = 3 * n + 1;
        }
        
        // 64bit 整数の範囲を超えても Java は大きな値を扱えるが、
        // Collatz sequence の特性上、通常は減るが偶数になるまで増えることもある。
        // ただし、指定通り "32bit 整数には収まりませんが、64bit 整数の範囲には収まります" とあるので
        // long で計算可能とみなす。ただし中間値がlongをオーバーフローする可能性（極端なケース）は
        // プラットフォーム依存だが、標準的な Collatz 問題では long が十分であることが一般的。
        // ここでオーバーフローが発生しない前提で実装する。

        nextSteps = 1 + steps(nextVal, memo);
        
        memo.put(n, nextSteps);
        return nextSteps;
    }
}
