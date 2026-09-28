import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long total = 0;
        Map<Integer, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            try {
                int n = Integer.parseInt(line.trim());
                if (n <= 0) continue;

                if (n == 1) {
                    // 1 のときの数は 0
                    long steps = 0;
                    total += steps;
                    // メモ化
                    memo.put(n, steps);
                } else {
                    // 偶数なら n/2, 奇数なら 3n+1
                    long steps = 0;
                    int currentN = n;

                    // 1 に到達するまでの手数を計算
                    while (currentN != 1) {
                        if (memo.containsKey(currentN)) {
                            steps = memo.get(currentN);
                            break;
                        }

                        if (currentN % 2 == 0) {
                            currentN /= 2;
                        } else {
                            currentN = 3 * currentN + 1;
                        }
                        steps++;
                    }
                    
                    // 計算結果をメモ化
                    memo.put(n, steps);
                    total += steps;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + total);
    }
}
