import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 行の前後の空白を無視する
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマは許容する
            if (trimmedLine.endsWith(",")) {
                // カンマのみの行は妥当ではない（1個以上の数字列が区切られていないため）
                // ただし、仕様では「1 個以上の数字列がカンマで区切られて並んでいること」が妥当の定義。
                // 末尾のカンマのみの行は、数字列が0個であるため不適。
                continue;
            }

            // カンマで分割して、各要素が整数であるか、かつ少なくとも1つの要素があるかを確認する
            String[] parts = trimmedLine.split(",");
            
            // 少なくとも1つの要素があるかを確認する（空行チェックで既に除外されているが念のため）
            if (parts.length == 0) {
                continue;
            }

            boolean isValid = true;
            for (String part : parts) {
                // 各部分が空でないことを確認する（カンマが連続している場合など）
                if (part.isEmpty()) {
                    isValid = false;
                    break;
                }
                // 各部分が整数であるかを確認する
                try {
                    Integer.parseInt(part.trim());
                } catch (NumberFormatException e) {
                    isValid = false;
                    break;
                }
            }

            if (isValid) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
        scanner.close();
    }
}
