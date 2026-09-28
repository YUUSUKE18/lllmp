import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Integer> memo = new HashMap<>();
        long total = 0;

        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;

            try {
                long n = Long.parseLong(line);
                if (!memo.containsKey(n)) {
                    memo.put(n, 0);
                    long current = n;
                    int step = 0;
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current /= 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        step++;
                    }
                    memo.put(n, step);
                }
                total += memo.get(n);
            } catch (NumberFormatException e) {
                // 無視
            }
        }

        System.out.println("total=" + total);
    }
}
