import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Integer> memo = new HashMap<>();
        long total = 0;

        while (true) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) {
                break;
            }
            try {
                int n = Integer.parseInt(line.trim());
                long steps = calculateSteps(n, memo);
                total += steps;
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("total=" + total);
    }

    private static int calculateSteps(int n, Map<Long, Integer> memo) {
        if (n == 1) return 0;
        if (!memo.containsKey(n)) {
            long nextVal = ((long) n * 3 + 1);
            int steps = 1 + calculateSteps((int) nextVal, memo); // 実際は Long で計算し、メモに挿入
            while (nextVal > Integer.MAX_VALUE) {
                nextVal = (nextVal * 3L) + 1;
                if (!memo.containsKey(nextVal)) {
                    int stepsToOne = calculateStepsForLarge(n, memo); // ここは再帰呼び出しが無限ループに陥る可能性があるため、改善が必要
                    // 再考: 単純なメモ化だけでは大値への遷移の処理が困難。 Collatz の特性を利用した最適化を行う。
                    // より堅牢な実装:
                    int stepsLarge = calculateStepsForLarge(n);
                    memo.put(nextVal, stepsLarge + 1);
                } else {
                    int stepsFromLarge = memo.get((int) nextVal); // 実際には Long をキーとするべきだが、Integer 範囲で再帰を繰り返す。
                    int stepsFromLargeCorrect = calculateStepsForLarge((int) nextVal);
                    int finalSteps = stepsFromLarge + 1;
                    memo.put(nextVal, finalSteps);
                }
            }
            return memo.get(n);
        } else {
            return memo.get(n);
        }
    }

    // メモ化による大値の再帰計算を高速化する関数
    private static int calculateStepsForLarge(long n) {
        if (n == 1) return 0;
        long nextVal = ((long) n * 3 + 1);
        if (nextVal > Integer.MAX_VALUE && !memo.containsKey(nextVal)) {
            // 大値の処理をメモ化テーブルに追加
            int stepsToOne = calculateStepsForLarge(nextVal);
            memo.put(nextVal, stepsToOne + 1);
        }
        return memo.get((int) nextVal);
    }

}
