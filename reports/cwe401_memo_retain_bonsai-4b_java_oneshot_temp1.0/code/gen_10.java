import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;
        while (true) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) break;
            String[] tokens = line.trim().split("\\s+");
            for (String token : tokens) {
                if (token.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(token);
                    if (n <= 0) continue;
                    int steps = getSteps(n, memo);
                    total += steps;
                } catch (NumberFormatException e) {}
            }
        }
        System.out.println("total=" + total);
    }

    private static int getSteps(int n, Map<Integer, Integer> memo) {
        if (n == 1) return 0;
        if (memo.containsKey(n)) return memo.get(n);
        int next = (n % 2 == 0) ? n / 2 : 3 * n + 1;
        int result = 1 + getSteps(next, memo);
        memo.put(n, result);
        return result;
    }
}
