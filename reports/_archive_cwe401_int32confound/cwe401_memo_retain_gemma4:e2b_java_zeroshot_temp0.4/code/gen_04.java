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
                    long count = 0;
                    totalCount += count;
                    // メモ化
                    memo.put(n, count);
                } else if (!memo.containsKey(n)) {
                    // Recursive step with memoization
                    long count;
                    if (n % 2 == 0) {
                        // n が偶数なら n/2
                        count = memo.getOrDefault(n / 2, -1);
                        if (count == -1) {
                            // 再帰的に計算が必要な場合
                            long subCount = calculateSteps(n / 2, memo);
                            count = 1 + subCount;
                        } else {
                            count = 1 + count;
                        }
                    } else {
                        // n が奇数なら 3n+1
                        long subCount = calculateSteps(3 * n + 1, memo);
                        count = 1 + subCount;
                    }
                    memo.put(n, count);
                    totalCount += count;
                } else {
                    // Already memoized
                    totalCount += memo.get(n);
                }

            } catch (NumberFormatException e) {
                // Ignore lines that are not valid integers
            }
        }

        System.out.println("total=" + totalCount);
    }

    /**
     * 再帰的にステップ数を計算し、メモ化を行うヘルパー関数。
     * この問題の構造上、クエリごとに計算するのではなく、
     * 最終的な合計を求めるために、各nが1に到達するまでのステップ数を計算する。
     * ただし、問題の要求は「各クエリnについて、nが1になるまでの手数を求め、その合計を求める」である。
     * これは、各クエリnに対して、nから1に到達するまでの操作の回数を数えることを意味する。
     *
     * ここでは、nが与えられたときに、nから1に到達するまでの操作回数を計算する関数として実装する。
     *
     * @param n 現在の数
     * @param memo メモ化マップ
     * @return nから1に到達するまでの手数
     */
    private static long calculateSteps(int n, Map<Integer, Long> memo) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long result;
        if (n % 2 == 0) {
            // n が偶数なら n/2
            result = 1 + calculateSteps(n / 2, memo);
        } else {
            // n が奇数なら 3n+1
            result = 1 + calculateSteps(3 * n + 1, memo);
        }

        memo.put(n, result);
        return result;
    }
}
