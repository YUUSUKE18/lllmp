import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        Map<Long, Integer> memo = new HashMap<>();
        int total = 0;
        while ((line = br.readLine()) != null && !line.isEmpty()) {
            long n = Long.parseLong(line.trim());
            total += calculateSteps(n, memo);
        }
        System.out.println("total=" + total);
    }

    private static int calculateSteps(long n, Map<Long, Integer> memo) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        int steps;
        if (n % 2 == 0) {
            steps = 1 + calculateSteps(n / 2, memo);
        } else {
            steps = 1 + calculateSteps(3 * n + 1, memo);
        }
        memo.put(n, steps);
        return steps;
    }
}
