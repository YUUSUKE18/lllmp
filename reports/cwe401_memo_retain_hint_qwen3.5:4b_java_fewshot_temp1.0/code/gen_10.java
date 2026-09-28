import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Integer> memo = new HashMap<>();
        memo.put(1L, 0);
        long totalSteps = 0;

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            
            try {
                long n = Long.parseLong(line.trim());
                
                if (memo.containsKey(n)) {
                    totalSteps += memo.get(n);
                } else {
                    int steps = 0;
                    while (!memo.containsKey(n)) {
                        if (n % 2 == 0) {
                            n /= 2;
                        } else {
                            n = 3L * n + 1;
                        }
                        steps++;
                    }
                    totalSteps += steps;
                    memo.put(OldN, steps);
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("total=" + totalSteps);
    }
}
