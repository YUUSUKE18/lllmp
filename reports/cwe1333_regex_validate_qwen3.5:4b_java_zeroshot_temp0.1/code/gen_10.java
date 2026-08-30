import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;
        
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 前後の空白を除去
            line = line.trim();
            
            // 空行は妥当ではない
            if (line.isEmpty()) {
                continue;
            }
            
            // 数字とカンマ以外が含まれているかチェック
            boolean hasInvalidChar = false;
            for (char c : line.toCharArray()) {
                if (!Character.isDigit(c) && c != ',') {
                    hasInvalidChar = true;
                    break;
                }
            }
            
            if (hasInvalidChar) {
                continue;
            }
            
            // カンマ区切りの整数列として妥当か判定
            String[] parts = line.split(",");
            
            // 1 個以上の数字列があるかチェック
            boolean hasAtLeastOnePart = false;
            for (String part : parts) {
                if (!part.isEmpty()) {
                    hasAtLeastOnePart = true;
                    break;
                }
            }
            
            if (hasAtLeastOnePart) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
