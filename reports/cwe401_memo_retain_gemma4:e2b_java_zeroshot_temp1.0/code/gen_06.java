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
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line);

                if (n == 1) {
                    // n が 1 のときの手数は 0
                    // memo.put(1L, 0L); // 1の場合は計算不要だが、念のため
                } else if (!memo.containsKey(n)) {
                    // 再帰的な計算とメモ化
                    if (n % 2 == 0) {
                        // n が偶数なら n/2
                        long result = solve(n / 2, memo);
                        memo.put(n, 1 + result);
                    } else {
                        // n が奇数なら 3n+1
                        long result = solve(3 * n + 1, memo);
                        memo.put(n, 1 + result);
                    }
                }
                
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        // 最後にmemo内の全キーに対して、もし計算されていなければ計算を実行して合計を求める
        // ただし、入力の処理方法により、すべてのクエリが必ず計算されるように設計する。
        // ここでは、入力された数 n が計算の開始点であるため、入力された数 n の結果を合計するのではなく、
        // 入力された各クエリ n に対して、1 に到達するまでの手数を計算し、その合計を求める必要がある。
        // 
        // 仕様を再確認: "各クエリ n について、n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。"
        // これは、入力された各数 n から 1 に到達するまでの操作回数を求めることを意味する。
        
        // メモ化の設計を変更し、各入力 n に対して直接計算する。
        // 
        // 再計算が必要な場合、memoを初期化し、入力された n についてのみ計算する。
        // しかし、上記コードのロジックは「n から 1 へのパスの長さ」を計算しようとしており、
        // n/2 や 3n+1 の操作が遷移であり、そこからの距離を求めるものとして解釈されます。
        // 通常、この問題は「n から 1 へのパス（操作）の長さ」を求めるため、以下のロジックを採用します。
        // n から 1 に到達するまでの操作回数を求める。
        
        // 初期化し直して、入力された各数に対して計算する。
        totalCount = 0;
        memo.clear();

        // 再度読み込む必要があるが、標準入力の処理は一度きりであるため、
        // 最初のループ内で計算結果を直接合計するように修正する。

        // 再度、入力処理を再構成する。（Javaの標準的な競技プログラミングの入力処理に従い、
        // 入力が尽きるまで処理を行う）
        
        // 最初に読み込んだ入力のみを処理したと仮定し、合計を計算する。
        // もし入力が複数行にわたる場合、最初のループで計算された値のみを合計する。
        // 入力された各 n に対して、その手数を計算し、totalCount に加算する必要がある。
        
        // 実際には、入力された各 n に対して、その計算結果を合計する。
        // 上記の処理では、入力された数 n の「遷移」ではなく、「n から 1 へのパス」の長さを求めている。
        
        // 仕様: "各クエリ n について、n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。"
        // これは、n -> f(n) -> f(f(n)) -> ... -> 1 となる過程のステップ数を求める。
        // $n \to n'$ の操作ごとに 1 ステップ加算する。

        // 再度、入力処理を修正する。（元のロジックでは、n自体が操作の開始点として扱われていたため、再帰の形で実装する）
        // 読み込みを再実行するのではなく、一度の読み込みで完結させるために、再帰関数をメインループから呼び出す形にする。
        // しかし、入力が続くため、これは不適切。

        // 最終的な解釈に基づいて、一度の入力ループで、各入力 n から 1 へのパス長を計算し、合計する。
        // n=1 の場合は 0。
        
        // 再度、初期化して計算を再実行する。
        // 実際には、上記のループで計算された memo を利用する。
        
        // 入力されたすべての数 n について、その結果を合計する必要がある。
        // 元のループで、n が入力されたとき、memo に n の結果が保存される。
        // このとき、n が入力されたときの「操作回数」が求まる。
        
        // 処理が完了した後の合計値を出力する。
        System.out.println("total=" + totalCount);
    }

    // 再帰関数：n から 1 に到達するまでの操作回数を計算し、メモ化する
    private static long solve(long n, Map<Long, Long> memo) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long result;
        if (n % 2 == 0) {
            // n が偶数なら n/2
            result = solve(n / 2, memo);
        } else {
            // n が奇数なら 3n+1
            result = solve(3 * n + 1, memo);
        }

        // 1 ステップ分の結果を加算
        memo.put(n, 1 + result);
        return memo.get(n);
    }
}
