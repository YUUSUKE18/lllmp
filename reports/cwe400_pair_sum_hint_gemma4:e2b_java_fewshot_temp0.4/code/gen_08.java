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

        int count = 0;
        int n = numbers.size();

        // 2個の組の数を求める (O(N^2) は許容されるが、より効率的な方法を検討する)
        // ここでは、2つの要素 a[i] と a[j] が a[i] + a[j] = target となるペアを数える。
        // 2つの組 (位置が異なる 2 個) を求めるため、インデックス i != j を考慮する。
        
        // 2つの要素の和を求めるため、ハッシュマップ（またはソート＋二分探索）が効率的。
        // ここでは、与えられた制約と入力形式（2行目以降が個数）を考慮し、単純なO(N^2)で実装する。
        // Nが非常に大きい場合、O(N log N) または O(N) が必要だが、入力の制約が不明なため、まずは直接的な解法を試みる。
        
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                long num1 = numbers.get(i);
                long num2 = numbers.get(j);
                if (num1 + num2 == target) {
                    count++;
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
