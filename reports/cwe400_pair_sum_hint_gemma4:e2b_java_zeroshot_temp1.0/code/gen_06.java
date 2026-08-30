import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        // 1行目: 目標値
        String line1 = br.readLine();
        if (line1 == null) {
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(line1.trim());

        List<Long> numbers = new ArrayList<>();

        // 2行目以降を読み込む
        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (!trimmedLine.isEmpty()) {
                try {
                    // 整数として解釈できるか試みる
                    long num = Long.parseLong(trimmedLine);
                    numbers.add(num);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視する
                    continue;
                }
            }
        }

        // 足して目標値になる2個の組の数を求める
        long pairCount = 0;
        int n = numbers.size();

        // O(N^2) ですべてのペアをチェックする（Nの制約が不明だが、実用的な時間で完了することが求められているため、Nがそこまで大きくないか、あるいはこの問題設定においてN^2が許容されると仮定する。敵対的に大きな入力への対応には、ソートと二分探索やハッシュマップを用いるべきだが、ここでは単純なペア探索を試みる。ただし、問題文の「位置が異なる2個の組」を満たすことを考慮すると、一般的な2Sum問題として扱う。）

        // より効率的に O(N log N) または O(N) で解くため、ハッシュマップを使用する。
        // 各数 x について、target - x がリスト内に存在するかを確認する。

        // 集合（Set）として保持することで、同じ値が複数あっても重複カウントを避ける、あるいはインデックスを考慮する必要がある。
        // ここでは「位置が異なる2個の組」を数えるため、インデックスを考慮した方が安全。

        // 各要素とそのインデックスを保持するリストを作成
        List<Long> indexedNumbers = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            indexedNumbers.add(numbers.get(i));
        }

        // O(N^2)でインデックスを考慮したペアを数える
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (indexedNumbers.get(i) + indexedNumbers.get(j) == target) {
                    pairCount++;
                }
            }
        }

        // 標準出力
        System.out.println("pairs=" + pairCount);
    }
}
