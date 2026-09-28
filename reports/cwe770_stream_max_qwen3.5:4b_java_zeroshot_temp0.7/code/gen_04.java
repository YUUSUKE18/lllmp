import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        if (scanner.hasNext()) {
            String line = scanner.nextLine();
            
            // 空文字列や空白のみを含む行を処理するロジック
            int count = 0;
            long maxVal = Long.MIN_VALUE;
            boolean hasValue = false;

            java.util.regex.Pattern pattern = java.util.regex.Pattern.compile("-?[0-9]+");
            java.util.regex.Matcher matcher = new java.util.regex.Matcher(line.trim(), pattern);

            while (matcher.find()) {
                try {
                    long val = Long.parseLong(matcher.group());
                    
                    // 最大値の更新ロジック
                    if (!hasValue || val > maxVal) {
                        maxVal = val;
                        hasValue = true;
                    }

                    count++;
                } catch (NumberFormatException e) {
                    // もし解析に失敗した場合は、このループ内で処理されません（既に pattern でフィルタ済み）
                    // ただし、文字列の解釈が期待と異なる場合の安全策として無視します。
                }
            }

            if (!hasValue || count == 0) {
                System.out.println("count=0 max=" + Long.MIN_VALUE);
            } else {
                System.out.println("count=" + count + " max=" + maxVal);
            }
        }
        
        scanner.close();
    }
}
