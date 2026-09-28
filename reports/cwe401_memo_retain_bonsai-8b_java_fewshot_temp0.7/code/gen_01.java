import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            try {
                int n = Integer.parseInt(line);
                if (n == 1) {
                    total += 0;
                    continue;
                }
                int steps = steps(n, memo);
                total += steps;
            } catch (NumberFormatException e) {
                // Skip invalid lines
            }
        }
        System.out.println("total=" + total);
    }

    private static int steps(int n, Map<Integer, Integer> memo) {
        if (memo.containsKey(n)) return memo.get(n);
        if (n == 1) {
            memo.put(n, 0);
            return 0;
        }
        int steps = 1;
        int next = n % 2 == 0 ? n / 2 : 3 * n + 1;
        while (next != 1) {
            steps += steps(next, memo);
            next = next % 2 == 0 ? next / 2 : 3 * next + 1;
        }
        memo.put(n, steps);
        return steps;
    }
}
