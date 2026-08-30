import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;
        
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 行の前後の空白を切り取り、空行は除外
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }
            
            // 正規表現による判定
            // ^: 行の始まり
            // [\s,0-9]+: 1 つ以上の文字列、空白または数字（カンマ含むが、ここでは数値と区切りのための表現）
            // (?:[\d,]+|\D+): 組内は「数字とカンマだけでない」場合の除外
            // \s*: 空白の後に続く空白を許容
            // [0-9,]+$: 末尾が数字またはカンマであること
            // ^$: 行の終わり
            boolean isValid = java.util.regex.Pattern.matches("(?:^\\s*(?:[0-9,]+$)|([[:space:]]|[^\\d,])|$)\\s*$)", trimmedLine);

            if (isValid) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount + "\n");
    }
}
