import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目: 目標値の読み込み
        String targetLine = br.readLine();
        if (targetLine == null) {
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(targetLine.trim());

        List<Long> numbers = new ArrayList<>();
        
        // 2行目以降の整数を読み込む
        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (!trimmedLine.isEmpty()) {
                try {
                    numbers.add(Long.parseLong(trimmedLine));
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視
                }
            }
        }

        // 足して目標値になる2個の組の数を数える
        long pairCount = 0;
        int n = numbers.size();

        // O(N^2)で全ペアをチェックする（Nが小さいと実用的）
        // Nの制約が不明ですが、一般的な競技プログラミングの制約を考慮すると、Nが数万程度であればO(N^2)も許容される可能性があります。
        // もしNが非常に大きい場合は、ハッシュマップを用いたO(N)またはO(N log N)の解法を検討する必要があります。
        // ここでは、N^2が許容される前提で実装します。

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    pairCount++;
                }
            }
        }

        // 結果の出力
        System.out.println("pairs=" + pairCount);
    }
}
