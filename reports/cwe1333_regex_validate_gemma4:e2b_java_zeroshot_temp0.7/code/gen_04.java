import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 行の前後の空白を無視
            String trimmedLine = line.trim();

            // 1. 空行の判定
            if (trimmedLine.isEmpty()) {
                continue;
            }

            // 2. 数字とカンマ以外を含む行の判定
            // 行が数字とカンマだけで構成されているかを確認
            boolean isValidFormat = true;
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (!Character.isDigit(c) && c != ',') {
                    isValidFormat = false;
                    break;
                }
            }

            if (!isValidFormat) {
                continue;
            }

            // 3. カンマ区切りの整数列の妥当性の判定
            // 1個以上の数字列がカンマで区切られているか、または末尾のカンマが許容されるか
            
            // 末尾のカンマを削除してチェックする（末尾のカンマが許容されるため）
            String content = trimmedLine;
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }

            // カンマで分割して、空でない要素が1つ以上存在するかチェックする
            String[] parts = content.split(",");
            
            // 妥当なのは、分割された要素の少なくとも1つが非空であること。
            // 例えば "1,2" -> ["1", "2"] (OK)
            // 例えば "," -> ["", ""] (NG, contentが空になるか、カンマのみになる場合)
            // 例えば "" -> [""] (NG)
            
            boolean isCommaSeparated = false;
            for (String part : parts) {
                if (!part.isEmpty()) {
                    isCommaSeparated = true;
                    break;
                }
            }

            if (isCommaSeparated) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
        scanner.close();
    }
}
