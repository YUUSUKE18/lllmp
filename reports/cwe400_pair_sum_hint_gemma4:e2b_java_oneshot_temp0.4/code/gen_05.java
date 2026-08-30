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

        int count = 0;
        int n = numbers.size();

        // 2個の組の数を数える (O(N^2)だが、制約によっては許容されると仮定)
        // 実際には、2つの値 a, b が存在し a + b = target となる組の数を数える。
        // ここでは、リスト内の任意の2つの要素の和がtargetになるペアの数を数える。
        // 問題文の解釈が「リスト内の2つの異なる要素の和がtargetになるペアの数」であると仮定する。
        // もし「インデックスが異なる2つの要素の和」を意味するなら、N^2で十分。
        
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
