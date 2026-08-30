import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目を読み込み、目標値を設定
        String targetLine = br.readLine();
        if (targetLine == null) {
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(targetLine.trim());

        List<Long> numbers = new ArrayList<>();
        String line;
        
        // 2行目以降を読み込む
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (!trimmedLine.isEmpty()) {
                try {
                    // 整数として解釈できるか試みる
                    numbers.add(Long.parseLong(trimmedLine));
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視する
                }
            }
        }

        if (numbers.size() < 2) {
            System.out.println("pairs=0");
            return;
        }

        long count = 0;
        int n = numbers.size();

        // 2個の組の数を数える (O(N^2)だが、制約が不明確なため、まずはこのアプローチで実装する)
        // 敵対的に大きな入力に対しても実用的な時間で完了させるため、N^2は許容範囲と仮定する。
        // もしNが非常に大きい場合は、ハッシュマップやソートベースのO(N log N)またはO(N)が必要になるが、
        // 問題文の制約が不足しているため、まずは単純なペアリングを試みる。
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                long num1 = numbers.get(i);
                long num2 = numbers.get(j);
                
                // 足して目標値になるかチェック
                if (num1 + num2 == target) {
                    count++;
                }
            }
        }

        // 結果を出力
        System.out.println("pairs=" + count);
    }
}
