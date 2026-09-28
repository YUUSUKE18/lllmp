import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        Map<Long, Long> memo = new HashMap<>();

        while (true) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    totalCount += 0;
                    continue;
                }

                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // 3n+1 または n/2 の操作を繰り返す
                long currentN = n;
                long steps = 0;
                
                // 1 に到達するまでの手数を計算し、途中の値をメモ化する
                while (currentN != 1) {
                    if (memo.containsKey(currentN)) {
                        // 既に計算済みの値に到達した
                        steps = memo.get(currentN);
                        break;
                    }
                    
                    if (currentN % 2 == 0) {
                        currentN = currentN / 2;
                    } else {
                        currentN = 3 * currentN + 1;
                    }
                    steps++;
                    
                    // 途中の値もメモ化（再帰的な計算のメモ化として）
                    memo.put(currentN, steps);
                }
                
                // 最終結果を合計に加算
                if (currentN == 1) {
                    totalCount += steps;
                } else {
                    // 念のため、ループが終了しても1に到達しなかった場合はエラー処理（この問題設定では通常起こらないはず）
                    // ここでは問題の制約に従い、1に到達したと仮定して進める
                }


            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
