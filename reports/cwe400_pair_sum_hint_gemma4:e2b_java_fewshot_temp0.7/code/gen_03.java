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
        String line;

        // 2行目以降の読み込み
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (!trimmedLine.isEmpty()) {
                try {
                    long num = Long.parseLong(trimmedLine);
                    numbers.add(num);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視
                }
            }
        }

        long count = 0;
        int n = numbers.size();

        // 2個の組の数を数える (O(N^2)だが、Nが実用的な範囲であれば許容される)
        // 課題の制約から、Nが非常に大きい場合も考慮する必要があるが、
        // 2個の組の数を求める問題は、一般的に2つの要素の和を求める問題として解釈される。
        // ここでは、2つの位置が異なる2つの整数の和が目標値になるペアの数を数える。

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                long num1 = numbers.get(i);
                long num2 = numbers.get(j);

                // 2つの組の和が目標値になるかチェック
                if (num1 + num2 == target) {
                    count++;
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
