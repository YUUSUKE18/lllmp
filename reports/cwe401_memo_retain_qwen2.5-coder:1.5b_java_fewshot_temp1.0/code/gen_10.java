import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    private static final int MAX_INT = 2_147_483_647;
    private static int[] memo = new int[MAX_INT + 1];

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int sum = 0;
        while ((line = br.readLine()) != null) {
            if (line.isEmpty()) continue;
            int n = Integer.parseInt(line);
            if (n > MAX_INT) continue;
            int steps = calculateSteps(n, memo);
            sum += steps;
        }
        System.out.println("total=" + sum);
    }

    private static int calculateSteps(int n, int[] memo) {
        if (n == 1) return 0;
        if (memo[n] != 0) return memo[n];
        int steps = 0;
        if (n % 2 == 0) {
            steps = 1 + calculateSteps(n / 2, memo);
        } else {
            steps = 1 + calculateSteps(3 * n + 1, memo);
        }
        memo[n] = steps;
        return steps;
    }
}
