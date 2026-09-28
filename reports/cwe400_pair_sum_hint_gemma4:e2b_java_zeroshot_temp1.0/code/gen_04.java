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
        if (targetLine == null || targetLine.trim().isEmpty()) {
            // 入力が空の場合は何もしない
            return;
        }
        long target = Long.parseLong(targetLine.trim());

        List<Long> numbers = new ArrayList<>();

        // 2行目以降の入力を読み込む
        String line;
        while ((line = br.readLine()) != null) {
            try {
                String trimmedLine = line.trim();
                if (!trimmedLine.isEmpty()) {
                    long number = Long.parseLong(trimmedLine);
                    numbers.add(number);
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
                continue;
            }
        }

        int count = 0;
        int n = numbers.size();

        // 2個の組 (i, j) について、i != j かつ numbers[i] + numbers[j] == target となるものの個数を数える
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
