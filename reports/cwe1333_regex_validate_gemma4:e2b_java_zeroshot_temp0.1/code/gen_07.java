import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 行の前後の空白を無視する（trim()を使用）
            String trimmedLine = line.trim();

            // 1. 空行の判定
            if (trimmedLine.isEmpty()) {
                continue;
            }

            // 2. 数字とカンマ以外を含む行の判定
            // 行が数字とカンマのみで構成されているかを確認する
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

            // 3. カンマ区切りの整数列が1個以上存在するかを判定
            // 妥当とは、1個以上の数字列がカンマで区切られて並んでいること。
            // これは、カンマが存在するか、または数字のみで構成されている場合に、
            // 少なくとも1つの数字列が存在すれば満たされる。
            
            // 末尾のカンマは許容される。
            // 妥当であるためには、少なくとも1つの数字が含まれている必要がある。
            
            // カンマが存在しない場合、それは単一の数字列（または数字のみ）として扱われる。
            // 例: "123" -> 妥当
            // 例: "123," -> 妥当 (末尾のカンマは許容)
            // 例: "," -> 不妥当 (数字列が0個)
            // 例: "" -> 既に除外済み
            
            // 少なくとも1つの数字が含まれているかを確認する
            boolean containsDigit = false;
            for (int i = 0; i < trimmedLine.length(); i++) {
                if (Character.isDigit(trimmedLine.charAt(i))) {
                    containsDigit = true;
                    break;
                }
            }

            if (containsDigit) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
        scanner.close();
    }
}
