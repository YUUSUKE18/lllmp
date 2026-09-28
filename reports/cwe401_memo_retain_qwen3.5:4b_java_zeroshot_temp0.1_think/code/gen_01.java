import java.util.*;
import java.io.*;

public class Main {
    private static Map<Long, Long> memo = new HashMap<>();

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        long totalSteps = 0;

        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }
            try {
                long n = Long.parseLong(line);
                totalSteps += getSteps(n);
            } catch (NumberFormatException e) {
                // Ignore non-integer lines
            }
        }

        System.out.println("total=" + totalSteps);
    }

    private static long getSteps(long n) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long nextN = (n % 2 == 0) ? n / 2 : 3 * n + 1;
        long steps = getSteps(nextN);
        memo.put(n, steps + 1);
        return steps + 1;
    }
}
