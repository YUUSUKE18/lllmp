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
            // 目標値が不正な場合は処理を終了（問題の制約上、通常は発生しないと仮定）
            System.out.println("pairs=0");
            return;
        }

        List<Long> numbers = new ArrayList<>();
        
        // 2行目以降の入力を読み込む
        String line;
        while ((line = br.readLine()) != null) {
            // 空行は無視
            if (line.trim().isEmpty()) {
                continue;
            }
            try {
                // 整数として解釈できるか試みる
                long num = Long.parseLong(line.trim());
                numbers.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        // 2個の組の個数を計算する
        long pairCount = 0;
        int n = numbers.size();

        // n個の数の中から、i番目の数とj番目の数が足してtargetになるペアを数える (i != j)
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
