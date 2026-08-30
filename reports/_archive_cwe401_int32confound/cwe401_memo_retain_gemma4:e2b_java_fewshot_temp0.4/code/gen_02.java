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
                if (n <= 0) continue; // 1以上の整数が与えられる前提だが念のため
                
                if (n == 1) {
                    // nが1のときの手数は0
                    long steps = 0;
                } else {
                    // メモ化された値があればそれを使用
                    if (memo.containsKey(n)) {
                        steps = memo.get(n);
                    } else {
                        // 再帰または反復計算で手数を求める
                        long currentN = n;
                        long count = 0;
                        while (currentN != 1) {
                            if (currentN % 2 == 0) {
                                currentN /= 2;
                            } else {
                                currentN = 3 * currentN + 1;
                            }
                            count++;
                        }
                        steps = count;
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
