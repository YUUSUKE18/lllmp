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
        if (line == null) return;
        long target = Long.parseLong(line.trim());

        List<Long> numbers = new ArrayList<>();

        // 2行目以降の読み込みとフィルタリング
        while (true) {
            line = br.readLine();
            if (line == null) break;

            try {
                long num = Long.parseLong(line.trim());
                numbers.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        // 2個の組の数を計算
        long pairCount = 0;
        int n = numbers.size();

        // 2つの要素 a と b が存在し、a + b = target となるペアを数える
        // 2つの異なる位置 (i != j) の要素を探す。
        // ここでは、配列/リスト内の要素のインデックス (i, j) を考える。
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                long num1 = numbers.get(i);
                long num2 = numbers.get(j);

                if (num1 + num2 == target) {
                    pairCount++;
                }
            }
        }

        // 結果の出力
        System.out.println("pairs=" + pairCount);
    }
}
