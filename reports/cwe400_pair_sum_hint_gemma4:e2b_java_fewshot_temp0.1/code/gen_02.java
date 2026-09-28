import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目を読み込み、目標値を設定
        String line = br.readLine();
        if (line == null) {
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(line.trim());
        
        List<Long> numbers = new ArrayList<>();
        
        // 2行目以降を読み込む
        String nextLine;
        while ((nextLine = br.readLine()) != null) {
            String trimmedLine = nextLine.trim();
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
        
        // 2個の組の数を数える (O(N^2)だが、制約が不明なため、ここでは単純な全探索で対応する)
        // 実際には、2つの要素 a_i と a_j が a_i + a_j = target となるペアを数える。
        // 読み込んだリストの要素が、入力の順序に従うと仮定し、インデックスでペアを数える。
        
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
