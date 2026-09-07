import java.util.HashMap;
import java.util.Map;

public class Main {
    private Map<Integer, Integer> memo = new HashMap<>();

    public int calculateSteps(int n) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        int steps = calculateSteps(n % 2 == 0 ? n / 2 : 3 * n + 1) + 1;
        memo.put(n, steps);
        return steps;
    }

    public static void main(String[] args) {
        Main main = new Main();
        int total = 0;
        for (int i = 0; i < 10; i++) { // 例: 10 件のクエリを処理
            int query = Integer.parseInt(args[i]);
            total += main.calculateSteps(query);
        }
        System.out.println("total=" + total);
    }
}
