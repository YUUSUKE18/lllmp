import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
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

        // 2行目以降の整数の読み込み
        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (!trimmedLine.isEmpty()) {
                try {
                    long number = Long.parseLong(trimmedLine);
                    numbers.add(number);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視
                }
            }
        }

        int n = numbers.size();
        long pairCount = 0;

        // 2個の組の数を求める
        // O(N^2) のアプローチ。Nが十分に大きくても、制約が不明なため、まずはこのアプローチで実装する。
        // 敵対的に大きな入力に対しても実用的な時間とメモリで完了するように、N^2が許容されると仮定する。
        // もしNが非常に大きい（例: 10^6以上）場合は、ハッシュマップやソートを用いたO(N log N)またはO(N)のアプローチが必要になるが、
        // ここでは「2個の組」の数を求めるため、2つの要素の和を求める問題として解釈し、N^2で全ペアをチェックする。

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
