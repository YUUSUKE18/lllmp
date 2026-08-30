import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        // 状態をメモ化するためのマップ (n -> 手数)
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
                    long count = 0;
                    totalCount += count;
                    // 1のケースは既に処理したと見なすため、ここではスキップしても良いが、
                    // 厳密にクエリの処理をシミュレーションする流れで進める。
                    // 今回は、クエリが1から始まるという前提なので、1が入力されたらその後の処理は不要。
                    // ただし、問題の意図は「各クエリ n について操作を繰り返す」なので、
                    // 入力された n 自体が最初の値だと解釈し、そこから1に到達するまでの手数を計算する。
                    // 1が入力された場合、計算は終了なので、そのクエリに対する手数は0。
                    if (n > 0) { // 1以上が入力される前提
                        memo.put(n, 0L);
                    }
                } else if (!memo.containsKey(n)) {
                    // メモ化されていない場合、計算を行う
                    long currentN = n;
                    long steps = 0;

                    while (currentN != 1) {
                        if (currentN % 2 == 0) {
                            currentN /= 2;
                        } else {
                            currentN = 3 * currentN + 1;
                        }
                        steps++;
                    }
                    memo.put(n, steps);
                } else {
                    // メモ化されている場合、結果を合計に加算
                    long steps = memo.get(n);
                    totalCount += steps;
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + totalCount);
    }
}
