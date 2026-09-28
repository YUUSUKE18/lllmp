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
            
            // 前後の空白を切り捨て、正規表現で判定
            String trimmedLine = line.trim();
            
            // 1. 数字とカンマ以外がないかチェック（文字列中に非数値・非カンマがなければ OK）
            // 2. 全体が「数字列のカンマ区切り」または「末尾カンマ付き」であることをチェック
            // 正規表現: ^(\d+)(?:,\d+)*$ | ^\d+(?:,\d+)*,$
            
            if (trimmedLine.matches("(\\d+)(?:,\\d+)*$" + "|" + "\\d+(?:,\\d+)*,$")) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
