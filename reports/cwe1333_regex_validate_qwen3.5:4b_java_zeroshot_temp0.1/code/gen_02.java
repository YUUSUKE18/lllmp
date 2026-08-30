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
            
            // 数字とカンマ以外が含まれていないか確認
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
            
            // カンマ区切りの整数列として妥当か確認
            // 末尾のカンマは許容するため、カンマの数が偶数個（空の場合は 0）である必要がある
            int commaCount = 0;
            for (int i = 0; i < line.length(); i++) {
                if (line.charAt(i) == ',') {
                    commaCount++;
                }
            }
            
            // カンマが偶数個であれば、数字列は偶数個（または空）になり、すべて整数として解釈可能
            if (commaCount % 2 == 0) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
