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
        
        // 2行目以降の整数を読み込む
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
        
        // 2個の組 (a, b) が target になる条件は a + b = target である。
        // 2個の組 (a, b) の「位置が異なる」ことを考慮する必要がある。
        // numbers のインデックス i と j (i != j) に対して numbers[i] + numbers[j] = target となるペアの数を数える。
        
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    count++;
                }
            }
        }
        
        // 標準出力へ結果を出力
        System.out.println("pairs=" + count);
    }
}
