import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    private static Map<Long, Integer> memo = new HashMap<>();

    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;
        String line;

        while ((line = reader.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            try {
                long n = Long.parseLong(line.trim());
                totalSteps += calculateSteps(n);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalSteps);
    }

    private static int calculateSteps(long n) {
        if (n == 1) {
            return 0;
        }
        if (!memo.containsKey(n)) {
            long nextN = (n % 2 == 0) ? n / 2 : 3 * n + 1;
            memo.put(n, calculateSteps(nextN) + 1);
        }
        return memo.get(n);
    }
}
