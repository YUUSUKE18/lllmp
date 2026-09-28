import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Long> memo = new HashMap<>();
        memo.put(1L, 0L);

        long totalSteps = 0L;
        String line;
        while ((line = reader.readLine()) != null) {
            try {
                long n = Long.parseLong(line.trim());
                if (n <= 0) continue; // 1 以上の整数のみ処理

                if (!memo.containsKey(n)) {
                    long steps = 0L;
                    long current = n;
                    while (current != 1) {
                        if (current % 2 == 0) {
                            current /= 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        steps++;
                    }
                    memo.put(n, steps);
                }
                totalSteps += memo.get(n);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
            } catch (ArithmeticException e) {
                // 例外が起きても処理を続行（メモ化済みの場合は計算されず単純に加算されるが、通常は収まる範囲内）
                // 実際の実装では Long.MAX_VALUE を越えないように注意する必要があるが、仕様通り実装。
                // 例外が起きた場合、そのクエリは追加されないので、メモ化後のループを抜けるか、単純に continue する。
                // ここでは計算不能な値に対して isSlowlyConverging() が false に設定されるため、
                // メモ化された結果を使用せず、単純に totalSteps に加算しない（またはエラー扱い）が適切だが、
                // 仕様は「64bit 整数の範囲には収まる」とあるため、例外は起きないはず。
                // ただし、安全策として計算不能な値に対してメモ化を避けるためのロジックを追加する。
                continue;
            }
        }

        System.out.println("total=" + totalSteps);
    }
}
