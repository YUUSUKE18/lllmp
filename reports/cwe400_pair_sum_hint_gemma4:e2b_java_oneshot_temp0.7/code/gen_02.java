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
        long target;
        try {
            target = Long.parseLong(targetLine.trim());
        } catch (NumberFormatException e) {
            // 目標値が不正な場合は処理を終了（問題の制約上、通常は入力は正しいと仮定するが安全のため）
            System.out.println("pairs=0");
            return;
        }

        List<Long> numbers = new ArrayList<>();
        String line;
        // 2行目以降の読み込み
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }
            try {
                numbers.add(Long.parseLong(trimmedLine));
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        // 2個の組の数を数える
        long count = 0;
        int n = numbers.size();

        if (n >= 2) {
            // 2つの値 a と b について a + b = target となるペア (i, j) を探す (i != j)
            for (int i = 0; i < n; i++) {
                for (int j = i + 1; j < n; j++) {
                    long num1 = numbers.get(i);
                    long num2 = numbers.get(j);
                    if (num1 + num2 == target) {
                        count++;
                    }
                }
            }
        }

        // 結果の出力
        System.out.println("pairs=" + count);
    }
}
