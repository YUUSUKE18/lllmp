import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Long> memo = new HashMap<>();
        memo.put(1L, 0L);
        long totalSteps = 0L;

        String line;
        while ((line = br.readLine()) != null) {
            long[] parts = line.split("\\s+");
            for (String part : parts) {
                if (part.isEmpty()) continue;
                try {
                    long n = Long.parseLong(part);
                    totalSteps += collatz(n, memo);
                } catch (NumberFormatException e) {
                    // 整数として解析できない行を無視
                }
            }
        }

        System.out.println("total=" + totalSteps);
    }

    private static long collatz(long n, Map<Long, Long> memo) {
        if (n == 1) return 0;
        
        if (memo.containsKey(n)) return memo.get(n);
        
        long steps = 1;
        if (n % 2 == 0) {
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
        
        long subSteps = collatz(n, memo);
        memo.put(n, subSteps + 1); // 結果をメモ化 (n に対しては subSteps+1)
        return steps + subSteps;
    }
}
