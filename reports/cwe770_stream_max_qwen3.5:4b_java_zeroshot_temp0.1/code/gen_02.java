import java.util.Scanner;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 入力文字列を取得し、空白を除去して分割する
        String inputLine = scanner.nextLine();
        if (inputLine == null || inputLine.trim().isEmpty()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE);
            return;
        }

        Pattern pattern = Pattern.compile("-?\\d+");
        Matcher matcher = pattern.matcher(inputLine.replace("\\s+", "")); // 空白を除去してマッチする
        
        long count = 0;
        long maxValue = Long.MIN_VALUE;
        
        while (matcher.find()) {
            String token = matcher.group();
            try {
                long value = Long.parseLong(token);
                
                if (!Long.isInfinite(value)) { // 無限大チェック（解析エラーの場合など）
                    count++;
                    
                    if (count == 1 || value > maxValue) {
                        maxValue = value;
                    }
                } else {
                    continue; 
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する（既に Pattern でフィルタ済みだが安全のため）
                continue;
            }
        }

        if (count == 0) {
            System.out.println("count=0 max=" + Long.MIN_VALUE);
        } else {
            System.out.println("count=" + count + " max=" + maxValue);
        }
        
        scanner.close();
    }
}
