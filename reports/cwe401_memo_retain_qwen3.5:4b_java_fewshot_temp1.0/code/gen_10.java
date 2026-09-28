import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Long> memo = new HashMap<>();
        long total = 0;

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;

            try {
                StringTokenizer st = new StringTokenizer(line);
                while (st.hasMoreTokens()) {
                    String token = st.nextToken();
                    if (!token.matches("-?[0-9]+")) continue;

                    long n = Long.parseLong(token);
                    int steps = 0;

                    // 奇数の場合のみ計算を進める（偶数は半分に減るため）
                    while (n % 2 != 0 && n > 1) {
                        long val = 3 * n + 1;
                        n = val;
                        steps++;
                    }

                    if (!memo.containsKey((int)n)) {
                        memo.put((int)n, Long.parseLong(String.valueOf(n)));
                    }
                    
                    // メモ化された結果を使って最終手数を求める
                    long stepsToOne = calculateSteps((int)n);

                    total += steps + (stepsToOne == 0 ? 0 : stepsToOne);
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("total=" + total);
    }

    private static long calculateSteps(int n) {
        return memo.getOrDefault(n, -1L);
    }
}
