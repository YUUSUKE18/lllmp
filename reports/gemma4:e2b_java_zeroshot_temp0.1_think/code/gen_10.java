import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> uniqueNumbers = new HashSet<>();
        long sum = 0;

        // カンマで分割して処理
        String[] tokens = line.split(",");

        for (String token : tokens) {
            // 前後の空白を削除
            String trimmedToken = token.trim();

            if (trimmedToken.isEmpty()) {
                continue; // 空要素は無視
            }

            try {
                // 整数として解析を試みる
                int number = Integer.parseInt(trimmedToken);
                
                // 重複を除いた集合に追加
                uniqueNumbers.add(number);
                
                // 合計を計算 (long型で保持)
                sum += number;
                
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
                continue;
            }
        }

        // 結果を出力
        System.out.println("count=" + uniqueNumbers.size() + " sum=" + sum);
    }
}
