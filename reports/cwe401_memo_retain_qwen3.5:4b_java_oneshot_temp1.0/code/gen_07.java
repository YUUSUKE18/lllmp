import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Long> memo = new HashMap<>();
        memo.put(1L, 0L);
        long totalSteps = 0;

        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            try {
                int n = Integer.parseInt(line);
                long current = n;
                long steps = 0;
                
                while (current != 1) {
                    long next = ((current % 2 == 0) ? current / 2 : 3L * current + 1);
                    if (!memo.containsKey(next)) {
                        memo.put(next, steps + 1);
                    } else {
                        steps += memo.get(next);
                        break;
                    }
                    current = next;
                    steps++;
                }
                
                totalSteps += steps;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalSteps);
    }
}
