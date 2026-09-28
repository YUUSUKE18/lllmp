import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
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
                if (n <= 1) {
                    // 1 の場合は手数は 0
                    memo.put(n, 0L);
                } else {
                    // 再帰的計算とメモ化
                    long count = calculateSteps(n, memo);
                    memo.put(n, count);
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        // すべてのクエリに対する手数の合計を計算
        // 入力として与えられた各行がクエリに対応すると仮定し、その手数を合計する。
        // 問題文の解釈として、入力された各整数 n について、操作を繰り返して 1 に到達するまでの手数を計算し、その合計を求める。
        // ただし、上記ロジックでは入力されたnごとに計算を行っているため、すべての計算結果を合計する。
        // memo内の値は各nに対するステップ数である。
        for (long count : memo.values()) {
            totalCount += count;
        }

        System.out.println("total=" + totalCount);
    }

    /**
     * n が 1 に到達するまでの手数を再帰的に計算し、メモ化する。
     * @param n 現在の数
     * @param memo メモ化のためのマップ
     * @return n から 1 に到達するまでの手数
     */
    private static long calculateSteps(int n, Map<Integer, Long> memo) {
        if (n == 1) {
            return 0L;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long result;
        if (n % 2 == 0) {
            // n が偶数なら n/2
            result = calculateSteps(n / 2, memo) + 1;
        } else {
            // n が奇数なら 3n+1
            result = calculateSteps(3 * n + 1, memo) + 1;
        }

        memo.put(n, result);
        return result;
    }
}
