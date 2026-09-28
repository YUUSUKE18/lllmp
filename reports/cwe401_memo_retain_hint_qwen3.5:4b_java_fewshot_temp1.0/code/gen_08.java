import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Locale;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in, Locale.US));
        Map<Long, Integer> memo = new HashMap<>();
        long n;
        long total = 0;

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            try {
                int len = line.length();
                int start = 0;
                boolean started = false;
                for (int i = 0; i < len; i++) {
                    char c = line.charAt(i);
                    if (c >= '0' && c <= '9') {
                        started = true;
                        start = i;
                        break;
                    }
                }
                if (!started) continue;

                int end = len - 1;
                while (end > start && line.charAt(end) >= '0' && line.charAt(end) <= '9') {
                    end--;
                }
                
                if (start == end || end < start) continue;

                n = Long.parseLong(line.substring(start, end + 1));

                int steps = getSteps(n, memo);
                total += steps;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + total);
    }

    private static int getSteps(long n, Map<Long, Integer> memo) {
        if (n == 1) return 0;
        
        if (!memo.containsKey(n)) {
            long next = (n % 2 == 0) ? n / 2 : 3 * n + 1;
            int steps = getSteps(next, memo) + 1;
            memo.put(n, steps);
            return steps;
        }
        return memo.get(n);
    }
}
