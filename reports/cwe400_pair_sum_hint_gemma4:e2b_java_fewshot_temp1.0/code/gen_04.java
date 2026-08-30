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
        
        // 2行目以降を読み込み、整数を収集
        String line;
        while ((line = br.readLine()) != null) {
            // 行を空白で分割し、整数としてパース
            String[] parts = line.trim().split("\\s+");
            for (String part : parts) {
                if (!part.isEmpty()) {
                    try {
                        numbers.add(Long.parseLong(part));
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない行は無視
                    }
                }
            }
        }

        if (numbers.size() < 2) {
            System.out.println("pairs=0");
            return;
        }

        // 足して目標値になる2個の組の数を数える
        long pairCount = 0;
        int n = numbers.size();
        
        // 2つの値 a と b が存在し、a + b = target となるようなペアの数を数える
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                long num1 = numbers.get(i);
                long num2 = numbers.get(j);
                
                if (num1 + num2 == target) {
                    pairCount++;
                }
            }
        }

        // 結果を出力
        System.out.println("pairs=" + pairCount);
    }
}
