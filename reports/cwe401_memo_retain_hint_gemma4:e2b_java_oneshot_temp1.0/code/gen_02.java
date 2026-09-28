import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        long totalCount = 0;
        // メモ化のためのマップ。キーはn、値はそのまでのステップ数
        Map<Long, Long> memo = new HashMap<>();

        while (true) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) {
                continue;
            }

            try {
                long n = Long.parseLong(line.trim());

                if (n == 1) {
                    // 1 に到達するまでの手数は 0
                    long steps = 0;
                    totalCount += steps;
                    // 1 の情報は既にメモされている可能性があるが、念のため設定
                    memo.put(1L, 0L);
                } else if (!memo.containsKey(n)) {
                    // メモされていない場合、計算を実行
                    long current = n;
                    long steps = 0;
                    
                    // 64bit整数に収まるように計算を進める
                    // サイクル検出のためのセット（防止策として、通常はトライアングル数字問題では不要だが、
                    // この問題は1に収束するため、サイクル検出は不要だが、安全のために含める）
                    // しかし、この問題は必ず1に収束するので、単なる再帰/反復で十分。
                    
                    while (current != 1) {
                        if (memo.containsKey(current)) {
                            // 既に計算済みの値に到達した場合、そのメモを合計に加算し、現在の計算を終了
                            long knownSteps = memo.get(current);
                            // 現在の計算がどこから始まるかを考慮する必要があるが、
                            // ここでは「nから1へのパス」を計算しているので、memo.get(current)は「currentから1へのパス」を表している。
                            // nからcurrentへのステップ数を加算する。
                            steps += knownSteps;
                            current = 1; // 処理終了
                            break;
                        }

                        if (current % 2 == 0) {
                            current = current / 2;
                        } else {
                            current = 3 * current + 1;
                        }
                        steps++;
                    }
                    
                    // 1に到達したときのステップ数をメモに格納
                    if (current == 1) {
                        memo.put(n, steps);
                        totalCount += steps;
                    }
                } else {
                    // 既にメモがある場合
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
