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

        // 足して目標値になる2個の組の数を求める
        long pairCount = 0;
        int n = numbers.size();

        // 2つの要素 a と b について a + b = target となるペアを探す
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                long num1 = numbers.get(i);
                long num2 = numbers.get(j);
                
                if (num1 + num2 == target) {
                    pairCount++;
                }
            }
        }

        // 結果の出力
        System.out.println("pairs=" + pairCount);
    }
}
