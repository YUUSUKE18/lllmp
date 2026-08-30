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
        
        // カンマで区切って各要素を処理する
        String[] parts = line.split(",");
        
        long totalCount = 0;
        long totalSum = 0;
        
        // 正規表現で "値:回数" の形式にマッチする部分を抽出する
        // パターン: (\d+):(\d+)
        Pattern pattern = Pattern.compile("(\\d+):(\\d+)");
        
        for (String part : parts) {
            // 前後の空白をトリム
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
                    
                    // 値を count 回足す
                    totalSum += (long) value * count;
                    // 要素数を加算 (要素数は個々の値の出現回数なので、ここでは 'count' を加算)
                    totalCount += count;
                    
                } catch (NumberFormatException e) {
                    // パースエラーは無視する（仕様上、正しくフォーマットされたもののみ処理する）
                    continue;
                }
            }
        }
        
        // 結果を出力
        System.out.println("count=" + totalCount + " sum=" + totalSum);
        
        scanner.close();
    }
}
