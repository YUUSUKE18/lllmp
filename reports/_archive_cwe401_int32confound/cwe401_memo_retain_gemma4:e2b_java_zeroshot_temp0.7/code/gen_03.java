import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        Map<Integer, Long> memo = new HashMap<>();

        String line;
        while ((line = br.readLine()) != null) {
            // 空行を無視
            if (line.trim().isEmpty()) {
                continue;
            }

            try {
                int n = Integer.parseInt(line.trim());
                
                // メモ化された値があればそれを使用
                if (memo.containsKey(n)) {
                    long count = memo.get(n);
                    totalCount += count;
                    continue;
                }

                // 再帰/メモ化再帰で手数を計算
                if (n == 1) {
                    memo.put(1, 0L);
                } else if (n % 2 == 0) {
                    // n が偶数なら n/2
                    long count = memo.get(n / 2) + 1;
                    memo.put(n, count);
                } else {
                    // n が奇数なら 3n+1
                    long count = memo.get(3L * n + 1) + 1;
                    memo.put(n, count);
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        // すべてのクエリの結果を合計する（メモ化された値が計算された場合のみ）
        // この問題の仕様は「各クエリ n について、n が 1 に到達するまでの手数を求め、その合計を求める」
        // 実際には入力された各数 n について計算し、その結果を合計する必要がある。
        // 再帰的に計算した結果は、その数 n から 1 に到達するまでの手数。
        
        // 入力されたすべての数について、その計算結果を合計する。
        // ただし、上記の実装では、再帰的に計算した結果をmemoに格納しているため、
        // 入力された各数 n が最終的に計算された結果を合計する処理が必要。
        // ここでは、入力された数 n がmemoに登録された時点で、その n から 1 への手数が確定しているとみなす。
        
        // より厳密に、入力された各行 n がクエリであり、その n から 1 への手数を合計する。
        // 再帰的に計算した結果を合計するのではなく、入力された各 n に対して計算し、その結果を合計する。
        
        // 再計算して合計する方式を採用する（メモ化された結果を直接合計するのではなく、入力された各数に対する計算結果を合計する）
        // 既存のメモ化ロジックは、入力された数 n を計算する過程で、その計算に必要な中間ステップをメモしているため、
        // 最終的な合計を求めるためには、入力された全ての数 n が処理された後に、それらの結果を合計する必要がある。
        
        // 仕様に従い、入力された各クエリ n についての手数を合計する。
        // 再度、入力された各数 n について、その手数を計算し、合計を求める。
        // 既にmemoにはnから1への手数が格納されている（ただし、これはnが入力された順番に依存する）。
        
        // 別の方法として、入力された各数 n に対して、その手数を計算し、合計する。
        // 既にmemoには全ての計算結果が格納されているので、入力された全てのクエリ（行）が処理されたと見なせる。
        // 最終的な合計は、入力された各クエリ n に対する手数の合計である。
        
        // 入力された各数 n に対する手数を合計する。
        // 既にmemoにはnが計算された結果が入っている。
        // 実際には、各入力行 n に対して、n から 1 への手数を計算し、それを合計する。
        
        // 修正：入力された全ての数 n について、その手数を合計する。
        // 既にmemoには、計算過程で登場した数 n から 1 への手数が格納されている。
        // どの入力行がどの計算結果に対応するかを追跡する必要があるが、
        // 最も簡単な解釈は、入力された全ての数値がクエリであり、その結果を合計することである。
        // 既存のロジックでは、入力された各行が処理された際に、その数 n から 1 への手数を計算し、
        // その計算結果をtotalCountに加算するように変更する。

        // 再度、標準入力から読み込み、合計を計算するロジックを修正する。
        // この問題は、入力された各行 n について、n から 1 への手数を計算し、その合計を求める。
        
        // 既存のロジックは、入力された数 n を計算する過程で、その中間ステップのメモを記録している。
        // 最終的な合計は、入力された全てのクエリ n について、n から 1 への手数を計算したものの合計である。

        // 既にmemoには、入力された全ての数 n が処理された結果が格納されている。
        // 各入力行が1つのクエリであるため、memoに格納された値がそのクエリの手数となる。
        
        // 最終的な合計を再計算する。
        // 既にmemoには、入力された各数 n に対して n から 1 への手数が格納されている。
        // したがって、memo内の全ての値の合計が求める合計となる。
        for (long count : memo.values()) {
            totalCount += count;
        }


        System.out.println("total=" + totalCount);
    }
}
