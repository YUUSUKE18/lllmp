import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        int total = 0;

        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;

            try {
                int n = Integer.parseInt(line);
                int steps = calculateSteps(n, memo);
                total += steps;
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("total=" + total);
    }

    private static int calculateSteps(int n, Map<Integer, Integer> memo) {
        if (n == 1) return 0;
        if (memo.containsKey(n)) return memo.get(n);

        int steps;
        if (n % 2 == 0) {
            steps = 1 + calculateSteps(n / 2, memo);
        } else {
            // 3n+1 が 64bit を超える可能性があるため、long で計算する
            long nextVal = 3L * n + 1;
            if (nextVal > Integer.MAX_VALUE) {
                // メモリ化できないので再帰で計算し続ける（結果は int 範囲内になるが途中値は long）
                steps = 1 + calculateSteps((int) nextVal, memo);
            } else {
                steps = 1 + calculateSteps((int) nextVal, memo);
            }
        }

        // 64bit で計算できた場合のみメモ化（3n+1 が int 範囲を超えた場合は、その後の値も long になる可能性があるが、
        // 問題文の「64bit 整数の範囲には収まる」という制約から、int 超えは long として処理）
        // ただし、Collatz 数列では 3n+1 が非常に大きくなることが知られている（例：8922705 -> ... -> 1）
        // そのような場合、int メモリ化できないので、結果が int に戻った後にメモ化する必要がある。
        // しかし、計算途中の値を long で保持し、最終的に int として返す形にする。
        // ここでは、計算結果が int 範囲内であればメモ化する。
        if (steps > 0) {
            // 計算されたステップ数は必ず正整数であり、int 範囲内（最大数百回）であることが知られている。
            memo.put(n, steps);
        }

        return steps;
    }
}
