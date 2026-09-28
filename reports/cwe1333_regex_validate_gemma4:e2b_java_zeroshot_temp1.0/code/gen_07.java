import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            // 行の前後の空白を無視
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマがあっても良いので、カンマで分割してチェックする
            // 末尾のカンマを削除してから分割することで、カンマ区切りの整数列が存在するかを判定する
            String content = trimmedLine;
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }

            // カンマで分割
            String[] parts = content.split(",");

            // 妥当性の判定：1個以上の数字列がカンマで区切られていること
            // 空の要素が含まれていないこと、そして少なくとも1つの要素が存在すること
            boolean isValid = true;
            for (String part : parts) {
                // 各部分が空でなければOK
                if (part.isEmpty()) {
                    // 空の要素（例: ",," や ",1,,2" のようなケース）は許容しない
                    isValid = false;
                    break;
                }
                // 数字列であるかチェック（Javaのsplitの結果は文字列なので、数値としての妥当性をより厳密に確認する）
                try {
                    Long.parseLong(part.trim());
                } catch (NumberFormatException e) {
                    // 数字に変換できない要素（数字とカンマ以外を含む）は妥当ではない
                    isValid = false;
                    break;
                }
            }

            if (isValid) {
                validCount++;
            }
        }

        // 結果の出力
        System.out.println("valid=" + validCount);
        scanner.close();
    }
}
