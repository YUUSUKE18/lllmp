import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        // 計算結果をメモ化するためのマップ
        Map<Long, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // nが1のときの手数は0
                    long steps = 0;
                    totalCount += steps;
                    // メモ化に追加
                    memo.put(n, steps);
                } else if (!memo.containsKey(n)) {
                    // 再帰的計算とメモ化
                    long steps = 0;
                    long current = n;
                    
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current /= 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        steps++;
                    }
                    
                    memo.put(n, steps);
                    totalCount += steps;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        // すべてのクエリの手数の合計を求めるため、ループ内で加算している。
        // 最終的な合計を求める。
        System.out.println("total=" + totalCount);
    }
}
