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
        
        // 2行目以降の読み込み
        String line;
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

        // 2個の組の数を求める
        long count = 0;
        int n = numbers.size();

        if (n >= 2) {
            // O(N^2)で全ペアをチェックする。Nが大きすぎないことを前提とする。
            // 課題の制約（敵対的に大きな入力）を考慮すると、N^2は許容範囲か、
            // より効率的な方法（ハッシュマップなど）が必要になる可能性があるが、
            // ここでは単純な2つの組の和を求める問題として、N^2で実装する。
            for (int i = 0; i < n; i++) {
                for (int j = i + 1; j < n; j++) {
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
