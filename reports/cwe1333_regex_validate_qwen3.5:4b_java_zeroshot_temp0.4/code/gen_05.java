import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;
        
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 前後の空白を除去
            String trimmedLine = line.trim();
            
            // 空行は妥当ではない
            if (trimmedLine.isEmpty()) {
                continue;
            }
            
            // 数字とカンマ以外が含まれているかチェック
            boolean hasInvalidChar = false;
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (!Character.isDigit(c) && c != ',') {
                    hasInvalidChar = true;
                    break;
                }
            }
            
            if (hasInvalidChar) {
                continue;
            }
            
            // 有効な形式かチェック（カンマ区切り、末尾カンマ許容）
            // 文字列をカンマで分割し、要素が空でないか確認
            String[] parts = trimmedLine.split(",");
            boolean isValidFormat = true;
            
            for (String part : parts) {
                if (part.isEmpty()) {
                    isValidFormat = false;
                    break;
                }
            }
            
            if (isValidFormat) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
