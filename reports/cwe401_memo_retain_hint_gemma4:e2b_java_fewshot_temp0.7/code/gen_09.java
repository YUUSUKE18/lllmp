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

                // メモ化された結果があればそれを使用
                if (memo.containsKey(n)) {
                    totalCount += memo.get(n);
                    continue;
                }

                // 計算ロジック（3n+1問題の逆操作を考える）
                // nが偶数なら n/2, 奇数なら 3n+1 に置き換える操作を逆算する。
                // 問題文の操作は n -> n/2 (nが偶数) または n -> 3n+1 (nが奇数) であり、
                // これはコナーの数列（3n+1問題）に関連する操作の逆操作を求める問題です。
                // 逆操作:
                // 1. n が 2k (偶数) の場合、元の値は 2n または 2n-1 のどちらか。
                //    もし n = n'/2 なら n' = 2n。
                //    もし n = 3n'+1 なら n' = (n-1)/3。
                //
                // ここで、問題文の操作を「nが1になるまでの手数」として解釈します。
                // nが偶数なら n/2、nが奇数なら 3n+1。
                // これは、通常の3n+1問題の逆操作（n -> (n-1)/3 または n -> n/2）を考えるのが一般的です。
                // 質問の操作は「nが偶数なら n/2、奇数なら 3n+1」であり、これは通常の3n+1問題とは異なります。
                // 問題文の操作をそのまま適用し、1に到達するまでのステップ数を数える必要があります。

                // 1に到達するまでの手数を求める再帰/メモ化 (nが1以外の場合)
                long steps = 0;
                long current = n;
                
                // 繰り返し計算とメモ化
                // 1に到達するまで計算を続ける
                while (current != 1) {
                    if (memo.containsKey(current)) {
                        // 既に計算済みの値があれば、その結果を現在のステップ数に加算して終了
                        long memoSteps = memo.get(current);
                        steps += memoSteps;
                        break;
                    }

                    // 遷移の計算
                    if (current % 2 == 0) {
                        // 偶数なら n/2
                        current = current / 2;
                    } else {
                        // 奇数なら 3n+1
                        current = 3 * current + 1;
                    }
                    steps++;
                    
                    // メモ化
                    if (current == 1) {
                        memo.put(n, steps);
                        break;
                    }
                }

                // 最終的な合計に加算
                if (current == 1) {
                    totalCount += steps;
                    memo.put(n, steps);
                } else {
                    // 処理が1に到達しなかった場合（理論上ありえないが念のため）
                    // この問題設定では必ず1に到達するはず
                }


            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
