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
            if (line == null) {
                break;
            }
            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // nが1のときの手数は0
                    totalCount += 0;
                    continue;
                }

                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // 再帰または反復計算とメモ化
                long count = 0;
                long current = n;
                
                // 1に到達するまでの手数を計算
                while (current != 1) {
                    if (memo.containsKey(current)) {
                        // 途中経過がメモ化されている場合、その差分を加算して終了
                        count += memo.get(current) - memo.get(n); // このロジックは再帰的なメモ化と異なるため、ここでは直接計算を優先する
                        break;
                    }
                    
                    if (current % 2 == 0) {
                        current = current / 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    count++;
                }
                
                // 最終的な計算結果をメモ化
                // ここでは、nから1に到達するまでのステップ数を計算し、それを合計する
                // 実際には、各クエリ n について、nが1になるまでのステップ数を計算し、その合計を求めたい。
                // 課題の意図を再解釈し、各クエリ n について、nが1になるまでの操作回数を求める。
                
                // 再度、nから1への操作回数を計算し、メモ化する
                long steps = 0;
                long tempN = n;
                Map<Long, Long> path = new HashMap<>(); // 現在のパスを追跡するためのメモ化

                // スタート地点nから1に到達するまでのステップ数を計算
                while (tempN != 1) {
                    if (path.containsKey(tempN)) {
                        // 既に計算済みの値があれば、その差分を加算
                        steps += path.get(tempN) - path.get(n);
                        break;
                    }
                    
                    path.put(tempN, 0); // 初期値として0を設定
                    
                    if (tempN % 2 == 0) {
                        tempN = tempN / 2;
                    } else {
                        tempN = 3 * tempN + 1;
                    }
                    path.put(tempN, path.get(tempN) + 1);
                }
                
                // 最終的なステップ数を計算し、合計に加算
                if (tempN == 1) {
                    // 1に到達したときのステップ数を計算
                    long currentSteps = 0;
                    long currentN = n;
                    while (currentN != 1) {
                        if (currentN % 2 == 0) {
                            currentN /= 2;
                        } else {
                            currentN = 3 * currentN + 1;
                        }
                        currentSteps++;
                    }
                    totalCount += currentSteps;
                    memo.put(n, currentSteps);
                }


            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
