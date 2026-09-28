import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Long> memo = new HashMap<>();
        memo.put(1L, 0L);

        String line;
        long totalSteps = 0;

        while ((line = reader.readLine()) != null) {
            try {
                long n = Long.parseLong(line.trim());
                if (n <= 0 || !Character.isDigit(n)) {
                    continue;
                }
                
                long steps = getCollatzSteps(n, memo);
                totalSteps += steps;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            } catch (Exception e) {
                // 他のエラーも無視
            }
        }

        System.out.println("total=" + totalSteps);
    }

    private static long getCollatzSteps(long n, Map<Long, Long> memo) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long steps;
        long nextN = n;

        if (n % 2 == 0) {
            nextN = n / 2;
            steps = 1 + getCollatzSteps(nextN, memo);
        } else {
            nextN = 3 * n + 1;
            steps = 1 + getCollatzSteps(nextN, memo);
        }

        memo.put(n, steps);
        return steps;
    }
}
