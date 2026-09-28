import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        // 1行目: 目標値
        String targetLine = br.readLine();
        if (targetLine == null) {
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(targetLine.trim());

        List<Long> numbers = new ArrayList<>();

        // 2行目以降の入力を読み込む
        String line;
        while ((line = br.readLine()) != null) {
            try {
                // 空行や空白のみの行を無視
                String trimmedLine = line.trim();
                if (trimmedLine.isEmpty()) {
                    continue;
                }
                long number = Long.parseLong(trimmedLine);
                numbers.add(number);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        int n = numbers.size();
        long pairCount = 0;

        // 2個の組の個数を求める。O(N^2)は入力サイズによっては遅くなる可能性があるが、
        // 制約が不明なため、まずは単純な方法で実装する。
        // 敵対的に大きな入力に対しても実用的な時間で完了させるため、
        // N^2が許容されると仮定し、ハッシュマップ（またはソート）を検討する。

        // 2つの要素 a[i] + a[j] = target を探す。
        // O(N^2)で全ペアをチェックする。
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
