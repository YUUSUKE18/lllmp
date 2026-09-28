import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        // 1行目: 目標値の読み込み
        String line = br.readLine();
        if (line == null) {
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(line.trim());

        List<Long> numbers = new ArrayList<>();

        // 2行目以降の整数の読み込み
        String nextLine;
        while ((nextLine = br.readLine()) != null) {
            try {
                // 空行や空白のみの行を無視
                String trimmedLine = nextLine.trim();
                if (trimmedLine.isEmpty()) {
                    continue;
                }
                long num = Long.parseLong(trimmedLine);
                numbers.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        int n = numbers.size();
        long pairCount = 0;

        // 2個の組の数を求める
        // O(N^2) の全探索で十分。Nが最大で入力サイズに依存するが、
        // 敵対的に大きな入力に対しても、N^2が許容されるか、またはより効率的な方法が必要か検討する。
        // ここでは、N^2が実用的な時間内に収まることを前提とする。
        // 入力サイズが非常に大きい場合（例: 10^6以上）、O(N log N) や O(N) の解法が必要になるが、
        // この問題設定では、N^2が許容されるか、またはターゲット値の範囲に依存する。
        // ターゲット値が非常に大きい場合、N^2は非現実的になる可能性があるため、
        // ターゲット値の範囲を考慮した方法を検討する。

        // ターゲット値 T に対して、a + b = T となる (a, b) の組を数える。
        // numbers リスト内の要素 a, b について a + b = T となるペア (a, b) を数える。
        // ただし、位置が異なる2個の組を数える必要がある。

        // 2つの異なるインデックス i と j (i != j) について numbers[i] + numbers[j] = target を満たす組を数える。

        // 効率化のため、ハッシュマップ（またはソート）を利用する。
        // ここでは、各要素がターゲットから引かれる値 (target - x) を持つ要素の数を数えるアプローチをとる。

        // ターゲット値 T を達成するペア (a, b) を数える。
        // a + b = T, a != b
        // 1. 全てのペア (i, j) で i != j をチェックする (O(N^2))
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    pairCount++;
                }
            }
        }

        // 最終結果の出力
        System.out.println("pairs=" + pairCount);
    }
}
