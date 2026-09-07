import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;
        int i = 0;
        while ((line = br.readLine()) != null && !line.isEmpty()) {
            i++;
            int num = Integer.parseInt(line);
            if (!memo.containsKey(num)) {
                total += compute(num, memo);
                memo.put(num, total);
            }
        }
        System.out.println("total=" + total);
    }

    private static int compute(int n, Map<Integer, Integer> memo) {
        if (n == 1) return 0;
        if (memo.containsKey(n)) return memo.get(n);
        int res = 0;
        if (n % 2 == 0) {
            res = 1 + compute(n / 2, memo);
        } else {
            res = 1 + compute(3 * n + 1, memo);
        }
        memo.put(n, res);
        return res;
    }
}
