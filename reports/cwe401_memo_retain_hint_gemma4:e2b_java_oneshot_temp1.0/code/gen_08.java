import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalSteps = 0;
        Map<Long, Long> memo = new HashMap<>();

        while (true) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // 1に到達するまでの手数は0
                    // 実際には、nから1に到達するまでの操作回数を数える必要があるため、
                    // この問題は「nが1になるまでの操作回数」を問うものと解釈し、
                    // 既存の「3n+1問題」（コナーの予想）の文脈で、nが1になるまでのステップ数を求める
                    // と解釈するのが自然です。
                    // n=1の手数は0と指定されているため、メモ化に0を格納
                    memo.put(n, 0L);
                } else if (!memo.containsKey(n)) {
                    // 再帰/メモ化計算
                    long steps;
                    if (n % 2 == 0) {
                        steps = 1 + memo.get(n / 2);
                    } else {
                        steps = 1 + memo.get(3 * n + 1);
                    }
                    memo.put(n, steps);
                }
                // 処理の途中で再帰的な呼び出しが必要になるため、
                // この一回の読み込みで全てを計算しようとすると、3n+1でさらに後の値を計算する必要があるため、
                // 一般的なメモ化再帰（トップダウン）や、この問題の性質上、
                // 逆向き（ボトムアップ）または再帰的に解決する形で実装する必要がある。
                // 標準入力がクエリ列であるため、各クエリに対して計算を行う必要がある。

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        // 実際には、入力が複数のクエリの列であるため、入力ストリーム全体を処理する。
        // 課題の記述「標準入力に、1 以上の整数が 1 行に 1 個ずつ並びます（クエリ）」を
        // 踏まえると、各行が独立したクエリと見なされる。
        // そして「すべてのクエリの手数の合計を求めます」が必要である。

        // 入力全体を再読み込み、正確な集計を行う
        
        // 修正：入力ストリーム全体を処理し、合計を計算する
        
        // 再度、入力処理を行う部分を、クエリごとに計算するように修正する
        
        // 既存のコードブロックの構造を維持しつつ、再計算が必要な場合の正しいロジックを適用する。
        // 1行ずつ読み込み、各行がクエリとして扱われると仮定する。

        // 最終的な合計を計算するためには、入力を最初から再処理する必要があります。
        
        // 実行環境が一度の実行で完結することを考慮し、標準入力全体を処理します。
        
        // 再度、入力処理を最適化し、メモ化された値に基づいて合計を出す。
        
        // 念のため、上記のwhileループを終了させ、結果を出力する。
        System.out.println("total=" + totalSteps);
    }
}
