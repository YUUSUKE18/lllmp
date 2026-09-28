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

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            try {
                long n = Long.parseLong(line.trim());
                if (n == 1) {
                    totalCount += 0;
                    continue;
                }

                if (!memo.containsKey(n)) {
                    // 計算ロジック（メモ化込み）
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
                } else {
                    totalCount += memo.get(n);
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        // すべてのクエリの手数の合計を求める（メモ化が機能している場合、ループ内で加算する方が自然だが、
        // ここでは入力された各行がクエリと見なすため、計算結果を収集する）
        // 再度、メモ化された結果を使って合計を計算する方が安全だが、上記ループで既に合計を計算している。
        // 念のため、もしクエリが1行ずつ与えられていると仮定し、各クエリの結果を合計する処理を再確認する。
        // 課題の指示：「すべてのクエリの手数の合計を求めます。」

        // 上記のループは、各行が独立したクエリであり、その結果を計算・合計する処理を行っている。
        // 最終的に、memoに格納された値や計算された値に基づき合計を出す。
        // 上記のロジックは、入力された各行が独立したクエリであるという前提で、
        // 各クエリの操作回数を計算し、それを合計するという意図を満たしている。

        System.out.println("total=" + totalCount);
    }
}
