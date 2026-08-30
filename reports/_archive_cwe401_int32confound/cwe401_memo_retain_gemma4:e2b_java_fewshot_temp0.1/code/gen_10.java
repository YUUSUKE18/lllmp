import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSum = 0;
        Map<Integer, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            try {
                int n = Integer.parseInt(line.trim());
                if (n <= 0) continue;

                if (n == 1) {
                    // n=1 のときの手数は 0
                    long steps = 0;
                } else {
                    // メモ化された値があればそれを使用
                    if (memo.containsKey(n)) {
                        steps = memo.get(n);
                    } else {
                        // 再帰的計算とメモ化
                        long steps = 0;
                        int current = n;
                        while (current != 1) {
                            if (current % 2 == 0) {
                                current /= 2;
                            } else {
                                current = 3 * current + 1;
                            }
                            steps++;
                        }
                        memo.put(n, steps);
                    }
                }
                totalSum += steps;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalSum);
    }
}
