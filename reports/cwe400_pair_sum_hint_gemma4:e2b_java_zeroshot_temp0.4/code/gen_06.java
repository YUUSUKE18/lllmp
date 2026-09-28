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
        if (targetLine == null) return;
        long target = Long.parseLong(targetLine.trim());

        List<Long> numbers = new ArrayList<>();

        // 2行目以降の入力を読み込む
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

        // 足して目標値になる2個の組の数を数える
        long pairCount = 0;
        int n = numbers.size();

        // O(N^2) のペアを探す（Nは入力された整数の数。敵対的に大きくても、Nが現実的な範囲であれば許容される）
        // 実際には、より効率的な方法（ハッシュマップやソート）を考えるべきだが、
        // ここでは「位置が異なる2個の組」を数えるため、インデックスベースで探索する。
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
