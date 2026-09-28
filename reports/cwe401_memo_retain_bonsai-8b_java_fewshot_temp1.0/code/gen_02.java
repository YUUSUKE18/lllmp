import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        Reader r = new InputStreamReader(System.in);
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;
        String line;
        while ((line = r.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            try {
                int n = Integer.parseInt(line);
                if (n == 1) {
                    total += 0;
                    continue;
                }
                int steps = steps(n, memo);
                total += steps;
            } catch (NumberFormatException e) {
                continue;
            }
        }
        System.out.println("total=" + total);
    }

    private static int steps(int n, Map<Integer, Integer> memo) {
        if (memo.containsKey(n)) return memo.get(n);
        if (n % 2 == 0) {
            int next = n / 2;
        } else {
            int next = 3 * n + 1;
        }
        int steps = 1 + steps(next, memo);
        memo.put(n, steps);
        return steps;
    }
}
