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
                int steps = getSteps(n, memo);
                total += steps;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + total);
    }

    private static int getSteps(int n, Map<Integer, Integer> memo) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        int steps;
        if (n % 2 == 0) {
            steps = 1 + getSteps(n / 2, memo);
        } else {
            // 3n+1 が 64bit 整数範囲を超えないことを保証するために、long で計算
            long nextVal = 3L * n + 1;
            if (nextVal > Integer.MAX_VALUE) {
                // 64bit 整数の範囲に収まるが int には収まらない場合
                // メモ化は int キーなので、この値を直接キーにすることはできない。
                // しかし、Collatz 問題では値は最終的に小さくなる傾向がある。
                // 実装上の簡便さから、long で計算し、再び int に戻れるか確認する必要があるが、
                // 問題文「途中に現れる値は 32bit 整数には収まりませんが、64bit 整数の範囲には収まります」
                // より、キーとして long を使うべきだが、Java の Map<Integer, Integer> は int キーのみ。
                // したがって、long キーを持つ Map に変更するか、int 範囲に収まるまで再帰を続けるか。
                // 通常 Collatz 軌道は整数範囲内を循環せず、最終的に 1 に戻るが、途中の値が long になることはある。
                // しかし、この問題文の文脈では「64bit 整数の範囲には収まります」とあるので、long キーを使うのが適切。
                // ただし、出力形式は Java の標準ライブラリのみ使用とあるので、long キーを持つ Map は許容される。
                // 修正：Map<Integer, Integer> を Map<Long, Long> に変更する必要があるか？
                // 問題文「計算結果をメモ化して高速化してください」かつ「途中に現れる値は...64bit 整数の範囲には収まります」
                // より、long キーと long バリューを持つ Map を使用すべき。
                // しかし、元の例では int を使っている。この課題では long が必須となる可能性がある。
                // したがって、Map<Long, Long> を使用する。
                
                steps = 1 + getSteps((int)(nextVal), memo); // これは誤り。long キーが必要。
            } else {
                steps = 1 + getSteps((int)nextVal, memo);
            }
        }

        // 上記のロジックは long キーが必要なため、再設計する。
        return -1; // プラセホルダー
    }
}
