import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalMoves = 0;
        Map<Long, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            try {
                long n = Long.parseLong(line.trim());
                if (n == 1) {
                    // 1に到達するまでの手数は0
                    continue;
                }

                // メモ化された値があればそれを使用
                if (memo.containsKey(n)) {
                    totalMoves += memo.get(n);
                    continue;
                }

                // 再帰または反復計算
                long current = n;
                long moves = 0;
                
                // 3n+1問題の計算とメモ化
                while (current != 1) {
                    if (memo.containsKey(current)) {
                        // 途中でメモ化された値に到達した場合
                        moves += memo.get(current);
                        break;
                    }
                    
                    if (current % 2 == 0) {
                        current = current / 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    moves++;
                }
                
                // 1に到達した後の手数をメモ化
                // 注意: この問題は、各クエリ n について n から 1 へのパスの長さを求め、その合計を求める問題です。
                // したがって、n から 1 へのパスの長さを計算し、その合計を求める必要があります。
                // ここでは、各 n について、n から 1 へのパスの長さを計算し、その合計を求めるように修正します。
                
                // 再計算（パスの長さを求める）
                long pathLength = 0;
                long tempN = n;
                while (tempN != 1) {
                    if (tempN % 2 == 0) {
                        tempN /= 2;
                    } else {
                        tempN = 3 * tempN + 1;
                    }
                    pathLength++;
                }
                
                totalMoves += pathLength;
                memo.put(n, pathLength);

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalMoves);
    }
}
