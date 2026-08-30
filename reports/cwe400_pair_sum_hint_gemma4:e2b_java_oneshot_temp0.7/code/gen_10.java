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

        // 2個の組の個数を求める (O(N^2) または O(N log N) で効率的に)
        // ここでは、2つの要素 a[i] + a[j] = target を探す。
        // N^2 のチェックで十分な場合と、ハッシュマップ/ソートで効率化する場合があるが、
        // 問題の制約が不明確なため、まずは直接的なペアリングを試みる。
        // N^2 は、入力サイズが大きくない限り許容されることが多い。
        
        // N^2 のチェック (O(N^2))
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    count++;
                }
            }
        }

        // 厳密には、同じ値が複数ある場合の重複カウントの扱いが必要だが、
        // 問題文は「2個の組（位置が異なる 2 個）の個数」なので、インデックスベースのペアカウントが正しい。
        // 入力が1行に1個ずつ並んでいるため、リスト内の要素のペアを数える。

        System.out.println("pairs=" + count);
    }
}
