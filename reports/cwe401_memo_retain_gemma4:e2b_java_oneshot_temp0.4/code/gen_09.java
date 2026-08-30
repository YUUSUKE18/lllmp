import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        // メモ化のためのマップ。キー: n, 値: 手数
        Map<Long, Long> memo = new HashMap<>();

        while (true) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // nが1のときの手数は0
                    long steps = 0;
                    totalCount += steps;
                    // 1は既にメモ済みだが、念のため
                    memo.put(1L, 0L);
                } else if (!memo.containsKey(n)) {
                    // 再帰的または反復的に計算し、メモ化する
                    long current = n;
                    long count = 0;
                    // 64bit整数に収まることを想定してループを続ける
                    while (current != 1 && !memo.containsKey(current)) {
                        if (current % 2 == 0) {
                            current = current / 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        count++;
                    }
                    // 1に到達したときのステップ数を記録
                    if (current == 1) {
                        memo.put(n, count);
                    }
                    // 途中で既に計算済みの値に到達した場合もメモに追加
                    if (memo.containsKey(current)) {
                        long stepsFromCurrent = memo.get(current);
                        memo.put(n, count + stepsFromCurrent);
                    }
                } else {
                    // メモがあれば加算する
                    long stepsFromN = memo.get(n);
                    totalCount += stepsFromN;
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
