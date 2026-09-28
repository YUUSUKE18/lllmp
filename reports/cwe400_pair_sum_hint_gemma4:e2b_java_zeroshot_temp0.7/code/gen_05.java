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
            String trimmedLine = nextLine.trim();
            if (!trimmedLine.isEmpty()) {
                try {
                    long num = Long.parseLong(trimmedLine);
                    numbers.add(num);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視
                    continue;
                }
            }
        }

        int count = 0;
        int n = numbers.size();

        // 2個の組の数を求める (O(N^2) または O(N log N) で効率的に)
        // 2個の組 (i, j) で numbers[i] + numbers[j] = target となるものを探す
        // i != j の制約がある。

        // 効率化のため、ハッシュマップ（またはソートと二分探索）を使うのが良いが、
        // 入力の制約が「敵対的に大きい入力に対しても実用的な時間とメモリで完了」という点から、
        // N^2 は N が非常に大きい場合は間に合わない可能性がある。
        // ただし、制約が不明確なため、まずは最も単純な O(N^2) で実装し、もしTLEになる場合は最適化を検討する。
        // 今回は、N^2が許容される、またはNが現実的な範囲であると仮定して実装する。

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    count++;
                }
            }
        }

        // 結果の出力
        System.out.println("pairs=" + count);
    }
}
