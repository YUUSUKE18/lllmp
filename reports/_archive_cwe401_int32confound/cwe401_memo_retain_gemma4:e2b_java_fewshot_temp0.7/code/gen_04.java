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
                if (n < 1) continue;

                if (n == 1) {
                    // n=1 のときの手数は 0
                    long steps = 0;
                    total += steps;
                    // メモ化は不要だが、念のため
                    memo.put(n, steps);
                } else {
                    // メモ化された値があればそれを使用
                    if (memo.containsKey(n)) {
                        total += memo.get(n);
                        continue;
                    }

                    // 計算とメモ化
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
                    
                    total += steps;
                    memo.put(n, steps);
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + total);
    }
}
