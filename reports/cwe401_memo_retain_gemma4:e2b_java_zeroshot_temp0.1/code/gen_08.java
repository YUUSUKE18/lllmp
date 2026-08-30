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
                    // nが1のときの手数は0
                    // memo.put(1L, 0L); // 1は特殊ケースとして扱うが、ここでは計算過程で到達する値として扱う
                    continue;
                }

                // メモ化された値があればそれを使用
                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // 計算の実行
                long count = 0;
                long current = n;

                while (current != 1) {
                    if (memo.containsKey(current)) {
                        // 既に計算済みの値に到達した場合、その結果を足し合わせる
                        count += memo.get(current);
                        break;
                    }

                    if (current % 2 == 0) {
                        current = current / 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    count++;
                }

                // 1に到達したときのステップ数を記録
                // 実際には、nから1に到達するまでのステップ数を求める必要がある。
                // ここでは、nが与えられたときの「操作の回数」を求める。
                // 1に到達するまでの手数を求めるため、再帰的または反復的に計算する。

                // 再計算（メモ化を最大限に活用する）
                long steps = 0;
                long temp = n;
                Map<Long, Long> pathMemo = new HashMap<>();
                pathMemo.put(1L, 0L);

                while (temp != 1) {
                    if (pathMemo.containsKey(temp)) {
                        steps += pathMemo.get(temp);
                        break;
                    }

                    if (temp % 2 == 0) {
                        temp = temp / 2;
                    } else {
                        temp = 3 * temp + 1;
                    }
                    pathMemo.put(temp, pathMemo.getOrDefault(temp, 0L) + 1);
                }
                
                // 最終的なステップ数をメモ化し、合計に加算
                if (temp == 1) {
                    memo.put(n, pathMemo.get(n));
                    totalCount += pathMemo.get(n);
                }


            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
