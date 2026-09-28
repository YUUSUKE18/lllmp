import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        memo.put(1, 0);
        int total = 0;

        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;

            try {
                int n = Integer.parseInt(line);
                int count = getSteps(n, memo);
                total += count;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
            }
        }

        System.out.println("total=" + total);
    }

    private static int getSteps(int n, Map<Integer, Integer> memo) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        int steps = 0;
        while (n != 1) {
            if (n % 2 == 0) {
                n = n / 2;
            } else {
                n = 3L * n + 1; // 64bit 計算を行うため long に昇格させる
                n = (int) n; // 結果が int 範囲内であることを保証（Collatz 仮説の性質上、int 範囲で戻ると期待される）
            }
            steps++;
        }

        memo.put(n, steps);
        return steps;
    }
}
