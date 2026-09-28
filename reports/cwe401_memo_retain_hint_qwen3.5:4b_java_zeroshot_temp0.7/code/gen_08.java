import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Integer> memo = new HashMap<>();
        memo.put(1L, 0);
        long total = 0;

        String line;
        while ((line = reader.readLine()) != null) {
            try {
                int n = Integer.parseInt(line.trim());
                if (n <= 0) continue;

                long current = n;
                int steps = 0;
                
                while (current != 1) {
                    if (current % 2 == 0) {
                        current /= 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    steps++;
                }

                total += steps;
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("total=" + total);
    }
}
