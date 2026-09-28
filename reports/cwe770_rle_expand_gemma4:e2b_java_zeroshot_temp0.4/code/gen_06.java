import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }
        String line = scanner.nextLine();
        
        // カンマで分割して個々の要素を取得
        String[] parts = line.split(",");
        
        long totalCount = 0;
        long totalSum = 0;
        
        // 正規表現で "値:回数" の形式をチェック
        Pattern pattern = Pattern.compile("^(\\d+):(\\d+)$");
        
        for (String part : parts) {
            // 前後の空白を無視
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }
            
            Matcher matcher = pattern.matcher(trimmedPart);
            
            if (matcher.matches()) {
                try {
                    // 値と回数を抽出
                    int value = Integer.parseInt(matcher.group(1));
                    int count = Integer.parseInt(matcher.group(2));
                    
                    // 要素数と合計を計算
                    totalCount += count;
                    totalSum += (long) value * count;
                    
                } catch (NumberFormatException e) {
                    // 数値変換エラーは無視（仕様上、値と回数は整数であると想定）
                }
            }
        }
        
        // 結果を出力
        System.out.println("count=" + totalCount + " sum=" + totalSum);
        
        scanner.close();
    }
}
