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
            try {
                long n = Long.parseLong(line.trim());
                if (n == 1) {
                    totalCount += 0;
                    continue;
                }

                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // 計算の実行とメモ化
                long count = 0;
                long current = n;
                long steps = 0;

                while (current != 1) {
                    if (current % 2 == 0) {
                        current = current / 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    steps++;
                }

                // 1 に到達するまでの手数を求める（これは元の問題の意図と異なる可能性があるため、
                // 実際には操作を繰り返す過程で1に到達するまでのステップ数を数える必要がある）
                // 問題文の解釈: n から操作を繰り返し、1 に到達するまでの手数を求める。
                // これは、nがFIBONACCI数列の操作（3n+1, n/2）を繰り返す問題（コネルの問題）を指していると解釈する。
                // ただし、問題文の記述「n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます」は、
                // 通常、nが1になるまで操作を繰り返すことを意味する。

                // 再度、操作を繰り返してステップ数を計算する
                long steps_to_one = 0;
                long temp = n;
                while (temp != 1) {
                    if (temp % 2 == 0) {
                        temp = temp / 2;
                    } else {
                        temp = 3 * temp + 1;
                    }
                    steps_to_one++;
                }
                
                // メモ化と合計の更新
                memo.put(n, steps_to_one);
                totalCount += steps_to_one;

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
