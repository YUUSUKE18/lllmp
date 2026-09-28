import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    private static final java.util.HashMap<Integer, Integer> memo = new java.util.HashMap<>();
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int total = 0;
        if (line != null) {
            String[] parts = line.trim().split("\\s+");
            for (String part : parts) {
                if (part.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(part);
                    int steps = getSteps(n);
                    total += steps;
                } catch (NumberFormatException e) {}
            }
        }
        System.out.println("total=" + total);
    }
    private static int getSteps(int n) {
        if (n == 1) return 0;
        if (memo.containsKey(n)) return memo.get(n);
        int steps = 1 + getSteps(n / 2);
        if (n % 2 == 0) steps = steps; // 空白区切りの処理はなし
        if (n % 2 == 1) {
            // 奇数: 3n+1
            int result = 3 * n + 1;
            if (result > 1) steps += getSteps(result);
            else steps += 0;
        }
        memo.put(n, steps);
        return steps;
    }
}
