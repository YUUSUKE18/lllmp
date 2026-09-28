import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;
        
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            if (line.isEmpty()) {
                continue;
            }
            
            // 前後の空白を切り取り、空行チェック（既に空なので重複しないが安全のため）
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }
            
            // 正規表現による判定
            // 要件: 1 個以上の数字列がカンマで区切られて並んでいること。末尾のカンマは許容。
            // 意味: ^(\d+)(?:,\d+)*$ または ^(\d+)(?:,\d+)*,$
            // 説明: 
            // ^ : 行の先頭
            // (\d+) : 少なくとも 1 つの数字 (キャプチャグループ 1)
            // (?:,\d+)* : 0 回以上カンマと数字の組み合わせ (非キャプチャグループ)
            // $ : 行の末尾
            
            if (trimmedLine.matches("(\\d+)(?:,\\d+)*$")) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
