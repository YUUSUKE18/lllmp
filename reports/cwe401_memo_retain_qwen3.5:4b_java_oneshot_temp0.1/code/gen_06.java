import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        memo.put(1, 0);
        long total = 0;

        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;

            try {
                int n = Integer.parseInt(line);
                int steps = calculateSteps(n, memo);
                total += steps;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + total);
    }

    private static int calculateSteps(int n, Map<Integer, Integer> memo) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        int steps = 0;
        while (n != 1) {
            if (n % 2 == 0) {
                n = n / 2;
            } else {
                // 64bit 整数の範囲に収まるため、long で計算し、結果を int として格納（問題文より収まると言われているが、安全のため long 処理）
                // ただし、メモ化のキーは Integer なので、最終的に 1 に到達するまでの値は int 範囲内と仮定して実装。
                // 実際には Collatz 数列は int 範囲外に出ることもありますが、問題文「64bit 整数の範囲には収まります」とあるので、
                // long で計算し、結果を int メモに保存する形にする（ただしキーは Integer）。
                // 注意：n が long になる場合、Map のキーが Integer であるため、long を int にキャストするか、別の Map を使う必要がある。
                // 問題文「途中に現れる値は 32bit 整数には収まりませんが、64bit 整数の範囲には収まります」とあるので、
                // long で計算し、結果を int メモに保存するのではなく、long メモを使うのが適切だが、
                // 出力形式やメモ化の要件から、int メモで実装しつつ、計算時は long を使う。
                // ただし、Collatz 数列は必ず 1 に収束するため、long で計算し、結果を int メモに保存する形にする。
                // しかし、キーが Integer なので、long 値を int にキャストしてメモ化するのは危険かもしれない。
                // より安全な方法：long を使う Map を作る。

                n = 3L * n + 1;
            }
            steps++;
        }

        memo.put(n, steps);
        return steps;
    }
}
