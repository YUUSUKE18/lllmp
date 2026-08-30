import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 前後の空白を除去し、空行の場合はスキップ
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }

            // 数字とカンマ以外の文字が含まれているかチェック
            boolean hasInvalidChar = false;
            for (char c : trimmedLine.toCharArray()) {
                if (!Character.isDigit(c) && c != ',') {
                    hasInvalidChar = true;
                    break;
                }
            }

            if (hasInvalidChar) {
                continue;
            }

            // 分割して整数列が有効か確認
            String[] parts = trimmedLine.split(",");
            
            // 空行はすでにスキップ済みなので parts が空になることはない。
            // ただし、もし「1 個以上の数字列」という条件を厳密に解釈する場合、
            // 分割結果が少なくとも 1 つある必要がある。
            if (parts.length == 0) {
                continue;
            }

            for (String part : parts) {
                if (part.isEmpty()) {
                    // カンマが続いて空の要素ができている場合（例："1,,2"）は妥当ではないと解釈する。
                    // 仕様では「数字列がカンマで区切られている」とあるため、空白なしの厳密な分割を行う。
                    continue; 
                }
            }

            validCount++;
        }

        System.out.println("valid=" + validCount);
    }
}
