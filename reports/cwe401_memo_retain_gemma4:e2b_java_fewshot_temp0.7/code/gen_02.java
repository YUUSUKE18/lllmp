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
                    // 1 に到達するまでの手数は 0
                    // memo.put(n, 0L); // 1はベースケースとして扱うが、ここでは計算結果を蓄積する
                } else if (!memo.containsKey(n)) {
                    // 再帰または動的計画法で計算
                    long count = 0;
                    long current = n;
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current /= 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        count++;
                    }
                    memo.put(n, count);
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        // 全てのクエリに対する手数の合計を計算
        // 注意: 問題文の解釈として、「すべてのクエリの手数の合計」を求めるため、
        // 入力された各行（クエリ）に対して計算を行い、その合計を求める必要があります。
        // 上記のループでは、入力された各数 n について、n から 1 に到達するまでの手数を計算し、
        // それを totalCount に加算する必要があります。

        // 再度、入力全体を処理し、合計を計算します。
        // memo には既に計算結果が入っているので、それを合計します。
        // ただし、元の問題文の意図は「入力された各nに対して、nから1への過程の総ステップ数」を求めることなので、
        // 最初のループでmemoに格納された値を使用します。

        // 最初のループは、入力された各nについて、nから1へのステップ数を計算し、memoに保存する処理でした。
        // ここで、memoに格納された値の合計を求めます。
        for (long n : memo.keySet()) {
            totalCount += memo.get(n);
        }

        System.out.println("total=" + totalCount);
    }
}
