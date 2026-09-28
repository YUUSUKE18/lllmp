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
            // 目標値が不正な場合は処理を終了（問題の制約から通常発生しないはずだが安全策）
            System.out.println("pairs=0");
            return;
        }

        List<Long> numbers = new ArrayList<>();
        String line;

        // 2行目以降の読み込み
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            try {
                long num = Long.parseLong(line.trim());
                numbers.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        long count = 0;
        int n = numbers.size();

        // 2個の組の数を数える (i != j)
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
