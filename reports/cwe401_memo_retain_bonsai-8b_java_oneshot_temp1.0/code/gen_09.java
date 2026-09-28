import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int total = 0;
        java.util.HashMap<Integer, Integer> memo = new java.util.HashMap<>();
        while (line != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            try {
                int n = Integer.parseInt(line);
                if (n == 1) {
                    System.out.println("total=0");
                    continue;
                }
                int steps = steps(n, memo);
                total += steps;
            } catch (NumberFormatException e) {
                // Ignore invalid numbers
            }
            line = br.readLine();
        }
        System.out.println("total=" + total);
    }

    private static int steps(int n, java.util.HashMap<Integer, Integer> memo) {
        if (n == 1) return 0;
        if (memo.containsKey(n)) return memo.get(n);
        int steps = 1;
        if (n % 2 == 0) n /= 2;
        else n = 3 * n + 1;
        steps += steps(n, memo);
        memo.put(n, steps);
        return steps;
    }
}
