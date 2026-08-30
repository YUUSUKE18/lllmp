import java.util.Scanner;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 64bit integer (long) のパターンを定義
        Pattern longPattern = Pattern.compile("-?\\d+");
        
        String inputLine = "";
        if (scanner.hasNext()) {
            inputLine = scanner.nextLine();
        } else {
            System.out.println("count=0 max="); // 入力がない場合のデフォルト処理（仕様上は空でも count=0）
            return;
        }

        String[] tokens = inputLine.split(",");
        
        long minLongValue = Long.MAX_VALUE;
        boolean hasNumber = false;

        for (String token : tokens) {
            // 空白を除去
            token = token.trim();
            
            if (!token.isEmpty()) {
                try {
                    // 整数として解析可能かチェック（正負の符号付き）
                    long value = Long.parseLong(token);
                    
                    minLongValue = Math.min(minLongValue, value);
                    hasNumber = true;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視
                }
            } else {
                continue;
            }
        }

        if (!hasNumber) {
            System.out.println("count=0 max=");
        } else {
            long count = tokens.length - (int)(inputLine.split(",").length); // 単純化のため、実際に有効な要素数を数える必要がある。再考:
            
            // 修正：厳密に「整数として解釈できる」ものの個数をカウントする
            int validCount = 0;
            for (String token : tokens) {
                if (!token.isEmpty() && Pattern.matches(longPattern, token.trim())) {
                    try {
                        long value = Long.parseLong(token); // ここで実際にパースし、エラーが起きなければ有効
                        minLongValue = Math.min(minLongValue, value);
                        validCount++;
                    } catch (NumberFormatException e) {
                        // 既にチェック済みだが安全のため無視
                    }
                } else if (!token.isEmpty()) {
                   try {
                       long val = Long.parseLong(token.trim());
                       minLongValue = Math.min(minLongValue, val);
                       validCount++;
                   } catch (NumberFormatException e) {} // 実際のパース失敗は上でもカバー済みだが、ロジックを整理する
                }
            }

            System.out.println("count=" + validCount + " max=" + minLongValue);
        }
        
        scanner.close();
    }
}
