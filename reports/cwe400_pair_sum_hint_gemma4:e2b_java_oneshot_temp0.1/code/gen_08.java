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
            if (trimmedLine.isEmpty()) {
                continue;
            }
            try {
                long num = Long.parseLong(trimmedLine);
                numbers.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        // 2個の組の数を計算
        long count = 0;
        int n = numbers.size();

        if (n >= 2) {
            for (int i = 0; i < n; i++) {
                for (int j = i + 1; j < n; j++) {
                    // 2つの要素の和が目標値になるかチェック
                    if (numbers.get(i) + numbers.get(j) == target) {
                        count++;
                    }
                }
            }
        }

        // 結果の出力
        System.out.println("pairs=" + count);
    }
}
