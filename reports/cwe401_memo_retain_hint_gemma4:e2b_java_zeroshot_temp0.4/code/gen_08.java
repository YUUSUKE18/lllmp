import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        Map<Long, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // Base case: 1 に到達するまでの手数は 0
                    long count = 0;
                    totalCount += count;
                    // メモ化
                    memo.put(n, count);
                } else if (!memo.containsKey(n)) {
                    // Recursive step with memoization
                    long nextN;
                    if (n % 2 == 0) {
                        nextN = n / 2;
                    } else {
                        nextN = 3 * n + 1;
                    }

                    // 探索の過程で、既に計算済みの値があればそれを利用する
                    long subCount = 0;
                    if (nextN > 1) {
                        // 再帰呼び出し
                        subCount = memo.getOrDefault(nextN, 0L);
                    } else {
                        // nextN が 1 の場合、その手数は 0
                        subCount = 0;
                    }

                    // 現在の n から 1 に到達する手数は 1 + (nextN から 1 に到達する手数)
                    long count = 1 + subCount;
                    memo.put(n, count);
                } else {
                    // 既に計算済みの値があれば加算
                    long count = memo.get(n);
                    totalCount += count;
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
