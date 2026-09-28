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
                    
                    // 抽出した値と回数に基づいて要素数を計算
                    // この形式は「値がcount回繰り返される」ことを意味する。
                    // 例: 7:3 は 7 が 3 回繰り返される (7, 7, 7)
                    
                    totalCount += count;
                    totalSum += (long) value * count;
                    
                } catch (NumberFormatException e) {
                    // 数値変換エラーは無視する（仕様上、回数は0以上だが、入力形式が不正な場合は無視）
                }
            }
        }
        
        // 結果の出力
        System.out.println("count=" + totalCount + " sum=" + totalSum);
        
        scanner.close();
    }
}
