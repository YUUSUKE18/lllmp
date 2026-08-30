import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    static Map<Long, Long> memo = new HashMap<>();

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;
        while (true) {
            String line = br.readLine();
            if (line == null) break;
            line = line.trim();
            if (line.isEmpty()) continue;
            try {
                int n = Integer.parseInt(line);
                totalSteps += getCollatz(n);
            } catch (NumberFormatException e) {
                continue;
            }
        }
        System.out.println("total=" + totalSteps);
    }

    private static long getCollatz(long n) {
        if (n == 1) return 0;
        if (memo.containsKey(n)) return memo.get(n);
        long steps = 1 + getCollatz(isEven(n) ? n / 2 : 3L * n + 1);
        memo.put(n, steps);
        return steps;
    }

    private static boolean isEven(long n) {
        return n % 2 == 0;
    }
}
