import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int total = 0;
        int memo[] = new int[1000001];
        if (line != null) {
            for (String n : line.trim().split("\\s+")) {
                if (n.isEmpty()) continue;
                int num = Integer.parseInt(n);
                total += memo[num];
                memo[num] = simulate(num, memo);
            }
        }
        System.out.println("total=" + total);
    }

    private static int simulate(int num, int[] memo) {
        if (num == 1) return 0;
        if (memo[num] != 0) return memo[num];
        int next;
        if (num % 2 == 0) next = num / 2;
        else next = 3 * num + 1;
        memo[num] = simulate(next, memo) + 1;
        return memo[num];
    }
}
