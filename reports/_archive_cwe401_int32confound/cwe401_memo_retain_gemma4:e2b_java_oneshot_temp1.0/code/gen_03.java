import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        // メモ化のためのマップ
        Map<Integer, Long> memo = new HashMap<>();

        while (true) {
            String line = br.readLine();
            if (line == null) {
                break;
            }
            
            // 空行や整数として解釈できない行を無視
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                int n = Integer.parseInt(line.trim());

                if (n == 1) {
                    // nが1のときの手数は0
                    totalCount += 0;
                    continue;
                }

                // メモ化された結果があればそれを使用
                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // 再帰的な計算とメモ化
                long count = 0;
                int currentN = n;
                
                // 1に到達するまでの手数を計算
                while (currentN != 1) {
                    if (currentN % 2 == 0) {
                        currentN /= 2;
                    } else {
                        currentN = 3 * currentN + 1;
                    }
                    count++;
                }
                
                // メモに保存
                memo.put(n, count);
                totalCount += count;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
