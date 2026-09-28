import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    private static final Map<Long, Integer> memo = new HashMap<>();

    private static int calculateSteps(long n) {
        if (n == 1L) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        long next = (n & 1) == 0 ? n / 2 : 3 * n + 1;
        int steps = calculateSteps(next);
        memo.put(n, steps + 1);
        return steps + 1;
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        long total = 0;

        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }
            try {
                long n = Long.parseLong(line);
                total += calculateSteps(n);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
            }
        }

        System.out.println("total=" + total);
    }
}
