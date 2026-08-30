import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;
        Map<Integer, Long> memo = new HashMap<>();

        while (true) {
            String line = br.readLine();
            if (line == null) {
                break;
            }
            
            try {
                int n = Integer.parseInt(line.trim());
                if (n <= 0) continue; // 1以上の整数が前提
                
                if (n == 1) {
                    // 1に到達するまでの手数は0
                    continue;
                }

                // メモ化された値があればそれを使用
                if (memo.containsKey(n)) {
                    totalSteps += memo.get(n);
                    continue;
                }

                // 計算過程
                int currentN = n;
                long steps = 0;
                
                // 再帰的な計算とメモ化
                // 1に到達するまでの手数を求める
                while (currentN != 1) {
                    if (memo.containsKey(currentN)) {
                        steps += memo.get(currentN);
                        break; // 既に計算済みのルートに到達したら終了
                    }
                    
                    if (currentN % 2 == 0) {
                        currentN /= 2;
                    } else {
                        currentN = 3 * currentN + 1;
                    }
                    steps++;
                }
                
                // 1に到達した後の手数をメモ化（この問題では各クエリで独立に計算するのではなく、
                // 提示された操作を繰り返す場合の「手数」を求める必要があるため、
                // 提示された操作を繰り返すという部分を解釈し直す必要があります。
                // 課題の記述「nが偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1に到達するまでの手数を求めます。」
                // これは有名なコナーの予想（3n+1問題）の手数計算を求めています。
                
                // 再度、メモ化をより適切に行うため、この計算方法を採用します。
                // 暫定的に、このnに対する計算結果を保存します。
                memo.put(n, steps);
                totalSteps += steps;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        // 最終結果の出力
        System.out.println("total=" + totalSteps);
    }
}
