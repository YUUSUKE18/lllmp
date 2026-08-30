import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        Map<Integer, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                int n = Integer.parseInt(line.trim());

                if (n == 1) {
                    // Base case: 1 に到達するまでの手数は 0
                    // ただし、ここでは n が操作の開始値として与えられているため、
                    // 1 から n への操作の逆を考えるのではなく、n から 1 への操作の手数を求める
                    // 1 のときの手数は 0 です。
                    // 実際には、n から 1 に到達するまでの操作回数を求める。
                    // n=1 のときの手数は 0。
                    // n=2 のとき: 2 -> 1 (1回)
                    // n=3 のとき: 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (7回)
                    // この問題は、操作 n/2 (n偶数) または 3n+1 (n奇数) がコラッツ予想に関連しており、
                    // 通常は n から 1 に到達するまでのステップ数を求める問題です。
                    // ここでは、与えられた操作を逆算するのではなく、与えられた操作を適用して 1 に到達するまでの回数を数えます。
                    
                    // 1 のときの手数は 0
                    if (n == 1) {
                        long count = 0;
                        totalCount += count;
                        continue;
                    }

                    // メモ化された値があればそれを使用
                    if (memo.containsKey(n)) {
                        totalCount += memo.get(n);
                        continue;
                    }

                    // 再帰的な計算とメモ化
                    long currentSteps = 0;
                    int currentN = n;
                    
                    // 1 に到達するまで繰り返す
                    while (currentN != 1) {
                        if (currentN % 2 == 0) {
                            currentN /= 2;
                        } else {
                            currentN = 3 * currentN + 1;
                        }
                        currentSteps++;
                        
                        // 循環を防ぐための安全策（問題の性質上、通常は収束するが念のため）
                        // ここでは、nが大きくなりすぎないことを前提とする。
                    }
                    
                    memo.put(n, currentSteps);
                    totalCount += currentSteps;

                } else {
                    // n >= 2 の場合、計算を実行
                    if (memo.containsKey(n)) {
                        totalCount += memo.get(n);
                        continue;
                    }

                    long currentSteps = 0;
                    int currentN = n;
                    
                    // 1 に到達するまで繰り返す
                    while (currentN != 1) {
                        if (currentN % 2 == 0) {
                            currentN /= 2;
                        } else {
                            currentN = 3 * currentN + 1;
                        }
                        currentSteps++;
                    }
                    
                    memo.put(n, currentSteps);
                    totalCount += currentSteps;
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
