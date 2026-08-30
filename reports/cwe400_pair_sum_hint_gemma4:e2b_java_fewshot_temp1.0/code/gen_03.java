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
        
        // 2行目以降を読み込み、整数を格納
        String nextLine;
        while ((nextLine = br.readLine()) != null) {
            String trimmedLine = nextLine.trim();
            if (trimmedLine.isEmpty()) {
                continue; // 空行は無視
            }
            try {
                // 1行に複数の整数が入っている場合も考慮して、スペースで分割して処理する
                String[] parts = trimmedLine.split("\\s+");
                for (String part : parts) {
                    if (!part.isEmpty()) {
                        numbers.add(Long.parseLong(part));
                    }
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視（仕様通り）
            }
        }
        
        // 2個の組の数を計算
        long pairCount = 0;
        int n = numbers.size();
        
        if (n >= 2) {
            for (int i = 0; i < n; i++) {
                for (int j = i + 1; j < n; j++) {
                    // 足して目標値になる2個の組を探す
                    if (numbers.get(i) + numbers.get(j) == target) {
                        pairCount++;
                    }
                }
            }
        }
        
        // 結果を出力
        System.out.println("pairs=" + pairCount);
    }
}
