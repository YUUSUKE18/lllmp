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
        long total = 0;

        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;

            try {
                int n = Integer.parseInt(line);
                int steps = calculateSteps(n, memo);
                total += steps;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + total);
    }

    private static int calculateSteps(int n, Map<Integer, Integer> memo) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        int steps = 0;
        while (n != 1) {
            if (n % 2 == 0) {
                n = n / 2;
            } else {
                // 64bit 整数の範囲に収まるため、long で計算し、結果を int に変換してメモ化
                long nextVal = 3L * n + 1;
                if (nextVal > Integer.MAX_VALUE) {
                    // 64bit 整数として処理し、int 範囲を超えた場合はそのまま処理（ただし問題文は「32bit 整数には収まりませんが、64bit 整数の範囲には収まります」とあるので、long で計算）
                    n = (int)(nextVal); 
                } else {
                    n = (int) nextVal;
                }
            }
            steps++;
        }

        memo.put(n, steps);
        return steps;
    }
}
