import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

public class Main {
    private static Map<Long, Long> memo = new HashMap<>();

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long total = 0;

        String line;
        while ((line = br.readLine()) != null) {
            StringTokenizer st = new StringTokenizer(line);
            if (st.hasMoreTokens()) {
                try {
                    long n = Long.parseLong(st.nextToken());
                    long steps = collatzSteps(n);
                    total += steps;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視
                }
            } else {
                // 空行は無視
            }
        }

        System.out.println("total=" + total);
    }

    private static long collatzSteps(long n) {
        if (n == 1) return 0;
        
        Long cached = memo.get(n);
        if (cached != null) return cached;

        long steps;
        if ((n & 1) == 0) { // 偶数
            steps = collatzSteps(n / 2) + 1;
        } else { // 奇数
            long next = 3 * n + 1;
            steps = collatzSteps(next) + 1;
        }

        memo.put(n, steps);
        return steps;
    }
}
