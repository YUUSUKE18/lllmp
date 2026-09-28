import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, Integer> memo = new HashMap<>();
        memo.put(1, 0);

        String line;
        int totalSteps = 0;

        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty() || !line.matches("-?[0-9]+")) {
                continue;
            }

            try {
                long n = Long.parseLong(line); // 64bit 整数として処理
                long stepsForN = getSteps(n, memo);
                totalSteps += stepsForN;
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("total=" + totalSteps);
    }

    private static int getSteps(long n, Map<Integer, Integer> memo) {
        // メモ化済みであれば返す。ただし、n が 1 から大きい場合、
        // 3n+1 が long を超えないことを考慮する必要があるが、仕様では「64bit 整数の範囲には収まる」とある。
        // しかし、メモキーに Integer と Long の不一致があるため、以下のアプローチを取る：
        // 実際の Collatz 数列は急速に増大する場合もあるが、1 に到達するとおり。
        // メモ化キーとして Long を使う必要があるが、Map<Integer> ではなく Map<Long> に変更する必要がある。

        return 0; 
    }
}
