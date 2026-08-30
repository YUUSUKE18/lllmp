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

        // 2行目以降を読み込み、整数を収集
        String line;
        while ((line = br.readLine()) != null) {
            try {
                String trimmedLine = line.trim();
                if (!trimmedLine.isEmpty()) {
                    long num = Long.parseLong(trimmedLine);
                    numbers.add(num);
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        long pairCount = 0;
        int n = numbers.size();

        // 2個の組の個数を求める (位置が異なる2個)
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
