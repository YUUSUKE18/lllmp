import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        // 1行目を読み込み、目標値を設定
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            // 目標値が読み込めない場合は終了
            return;
        }
        long target = Long.parseLong(targetLine.trim());

        List<Long> numbers = new ArrayList<>();

        // 2行目以降を読み込み、整数を格納
        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue; // 空行は無視
            }
            try {
                long number = Long.parseLong(trimmedLine);
                numbers.add(number);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        // 足して目標値になる2個の組の個数を数える
        long pairCount = 0;
        int n = numbers.size();

        // 2つの要素 a[i] と a[j] (i != j) の和が target になるペアを探す
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    pairCount++;
                }
            }
        }

        // 結果を出力
        System.out.println("pairs=" + pairCount);
    }
}
