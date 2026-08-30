import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalMoves = 0;
        Map<Long, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;

            try {
                long n = Long.parseLong(line.trim());
                if (n == 1) {
                    // Base case: 1 に到達するまでの手数は 0
                    // ただし、この問題の文脈では、nが1になったときにそこまでの操作回数を数えるのが自然だが、
                    // ここでは「nが1のときの手数は0」という定義に従う。
                    // この問題はコナーの数列（3n+1問題）を扱っているため、
                    // 1に到達するまでの操作回数を求める。
                    // n=1 なら 0 回。
                    long moves = 0;
                    totalMoves += moves;
                    // memo.put(n, moves); // 1の場合は0で十分
                } else if (!memo.containsKey(n)) {
                    long current = n;
                    long count = 0;
                    // Memoizationは、現在のnから1に到達するまでの操作回数を計算する。
                    // 途中で同じ値が現れたら、その値が既に計算済みの結果を持っているか確認する。
                    // 今回の課題は「nが1に到達するまでの手数を求める」なので、再帰的または反復的に計算する。

                    // 探索とメモ化
                    while (current != 1) {
                        if (memo.containsKey(current)) {
                            // 既に計算済みの値があれば、その結果を足し合わせる
                            long memoValue = memo.get(current);
                            count += memoValue + 1; // 1ステップ分を足す
                            current = 1; // 1に到達したと見なす
                            break;
                        }
                        memo.put(current, -1); // 計算中フラグ (一時的に値を保持しない)

                        if (current % 2 == 0) {
                            current /= 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        count++;
                    }
                    
                    // 最終的な計算結果の格納
                    memo.put(n, count);
                    totalMoves += count;

                } else {
                    // 既にメモがある場合
                    totalMoves += memo.get(n);
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalMoves);
    }
}
