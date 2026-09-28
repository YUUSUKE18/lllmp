import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    private static Map<Integer, Integer> memo = new HashMap<>();

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int total = 0;
        while ((br.readLine() != null)) {
            int n = Integer.parseInt(br.readLine());
            if (n == 1) continue;
            if (memo.containsKey(n)) {
                total += memo.get(n);
                continue;
            }
            int steps = calculateSteps(n);
            total += steps;
            memo.put(n, steps);
        }
        System.out.println("total=" + total);
    }

    private static int calculateSteps(int n) {
        if (n == 1) return 0;
        if (n % 2 == 0) {
            if (memo.containsKey(n / 2)) return memo.get(n / 2);
            int steps = calculateSteps(n / 2) + 1;
            memo.put(n / 2, steps);
            return steps;
        } else {
            if (memo.containsKey(3 * n + 1)) return memo.get(3 * n + 1);
            int steps = calculateSteps(3 * n + 1) + 1;
            memo.put(3 * n + 1, steps);
            return steps;
        }
    }
}
