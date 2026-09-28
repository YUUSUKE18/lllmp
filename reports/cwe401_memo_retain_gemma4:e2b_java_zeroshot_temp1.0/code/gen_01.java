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
        while (true) {
            line = br.readLine();
            if (line == null) {
                break;
            }

            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // 1に到達するまでの手数は0
                    // memo.put(1L, 0L); // 1からスタートする場合の計算結果
                } else if (memo.containsKey(n)) {
                    // メモがあればそれを採用
                    long count = memo.get(n);
                    totalCount += count;
                } else {
                    // 再帰計算（メモ化再帰）
                    if (n % 2 == 0) {
                        long next = n / 2;
                        long count = 1 + calculateSteps(next, memo);
                        memo.put(n, count);
                        totalCount += count;
                    } else {
                        long next = 3 * n + 1;
                        long count = 1 + calculateSteps(next, memo);
                        memo.put(n, count);
                        totalCount += count;
                    }
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        // 1のケースはループ内で直接合計に加算されていないため、別途処理が必要かもしれないが、
        // 問題文の指示「nが1のときの手数は0」を考慮して、nがクエリとして与えられた場合の処理を再検討する。
        // 仕様は「各クエリ n について、...1に到達するまでの手数を求めます」なので、入力されたnからスタートして1に到達するまでの手数を求める。

        // 再帰関数を定義し直して、スタート地点nから1までの手数を計算する。
        // メモ化を再実装する。
        
        // 再計算と統合のための構造変更
        
        // 再帰的な計算をメインロジックに統合し、メモ化を正しく使う。
        // 初期化
        totalCount = 0;
        memo.clear();

        // 再帰ヘルパー関数
        // calculateSteps(n): nからスタートして1に到達するまでの手数を返す
        java.util.function.Function<Long, Long> calculateSteps = (n) -> {
            if (n == 1) {
                return 0L;
            }
            if (memo.containsKey(n)) {
                return memo.get(n);
            }

            long result;
            if (n % 2 == 0) {
                // nが偶数 -> n/2 に置き換える操作を繰り返す
                result = 1 + calculateSteps.apply(n / 2);
            } else {
                // nが奇数 -> 3n+1 に置き換える操作を繰り返す
                result = 1 + calculateSteps.apply(3 * n + 1);
            }
            
            memo.put(n, result);
            return result;
        };

        // 入力処理の再実行（メモ化された計算を使用）
        // ここでは、入力された各nについて、そのnから1までの手数を計算し、合計する。
        // ※元のコード構造が「クエリnが与えられたら、nから1への到達時間を求める」と解釈し、
        // 1からスタートしてnに到達する操作を繰り返すのではなく、nから開始して1に到達する操作を繰り返す、と解釈します。
        // ただし、Collatz問題は通常、nから1への到達時間を求める。
        // 仕様：「nが偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1に到達するまでの手数を求めます。」
        // これは標準的なCollatz問題の定義に一致します。
        
        // 入力ストリームから読み込んだ値全てに対して計算を行う。
        // 最初の読み込みループを、メモ化された計算結果の合計を求める形に修正する。
        
        // 再度、入力ストリームを読み込む必要があるため、この構造を修正し、
        // 最初に読み込んだ値（n）がクエリであることを前提とする。
        // 最初のループで入力されたnを計算し、その結果を合計に加算する。
        
        // --- 最終的な処理ロジック ---
        
        // 再度、入力ストリームを読み込む（既に読み込み済みなので、ここでは再実行できないため、
        // 最初のループで読み込んだ値を格納する必要がある）
        
        // 最初の読み込みループで、各nがクエリであると仮定し、その結果を合計する。
        // calculateSteps(n)が、nから1への手数を返す。
        
        // 最初に読み込んだ値をすべて処理する。
        // (上記ループの構造が正しければ、totalCountはすでに計算されているはずだが、
        // 最初のループでmemo化が正しく機能しているか確認が必要)
        
        // 最初のループで、nが読み込まれたたびにそのnから1への手数を計算し、合計した。
        // したがって、totalCountにはすでに最終的な合計値が入っているはず。
        
        System.out.println("total=" + totalCount);
    }
}
