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

        // 2行目以降を読み込む
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

        // 2つの要素 a と b について、a + b = target となるペアを探す
        // 2個の組 (位置が異なる2個) を数えるため、インデックス i と j (i != j) を使用する。
        // ここでは、リスト内の値のペアを数えるため、重複を避けるためにインデックスベースで処理する。
        // もし入力が重複を含んでいる場合、元のリストのインデックスに基づいてペアを数える必要がある。

        // 2つの異なるインデックス i と j (i != j) について、numbers[i] + numbers[j] = target となるペアを数える。
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
