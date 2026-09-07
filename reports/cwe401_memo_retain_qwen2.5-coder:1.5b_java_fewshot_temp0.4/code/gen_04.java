import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;
        while ((br.ready() && !br.readLine().isEmpty())) {
            int n = Integer.parseInt(br.readLine());
            total += calculateSteps(n, memo);
        }
        System.out.println("total=" + total);
    }

    private static int calculateSteps(int n, Map<Integer, Integer> memo) {
        if (n == 1) return 0;
        if (memo.containsKey(n)) return memo.get(n);
        int steps = (n % 2 == 0) ? calculateSteps(n / 2, memo) : calculateSteps(3 * n + 1, memo) + 1;
        memo.put(n, steps);
        return steps;
    }
}
