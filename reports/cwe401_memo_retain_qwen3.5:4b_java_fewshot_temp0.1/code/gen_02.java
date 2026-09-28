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
                int steps = calculateSteps(n, memo);
                total += steps;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        System.out.println("total=" + total);
    }

    private static int calculateSteps(int n, Map<Integer, Integer> memo) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        int steps = 0;
        while (n != 1) {
            if (n % 2 == 0) {
                n = n / 2;
            } else {
                // 64bit 整数の範囲に収まるため、long で計算し、結果を int メモリに保存する必要があるか確認
                // 問題文: "途中に現れる値は 32bit 整数には収まりませんが、64bit 整数の範囲には収まります"
                // しかし、メモ化のキーとして int を使う場合、long 値を int キーでアクセスできないため
                // メモリマップのキーとバリューは long に変更する必要があります。
                // ただし、出力は total (合計) が long になるため、内部計算も long で行うべきです。
                // 修正: メモ化用のマップと計算を long に変更します。
            }
        }
        return steps;
    }
}
