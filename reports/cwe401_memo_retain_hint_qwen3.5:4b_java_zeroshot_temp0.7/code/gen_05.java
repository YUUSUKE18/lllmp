import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.StringTokenizer;

public class Main {
    private static HashMap<Long, Long> memo;

    public static void main(String[] args) throws IOException {
        memo = new HashMap<>();
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long total = 0;

        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }

            try {
                int n = Integer.parseInt(line);
                long steps = getSteps(n);
                total += steps;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + total);
    }

    private static long getSteps(long n) {
        if (n == 1) {
            return 0;
        }
        
        Long cached = memo.get(n);
        if (cached != null) {
            return cached;
        }

        long nextN;
        if (n % 2 == 0) {
            nextN = n / 2;
        } else {
            nextN = 3 * n + 1;
        }

        long steps = 1 + getSteps(nextN);
        memo.put(n, steps);
        return steps;
    }
}
