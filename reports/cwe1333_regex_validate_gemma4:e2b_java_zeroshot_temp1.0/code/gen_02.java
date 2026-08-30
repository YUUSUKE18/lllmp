import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validLines = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();

            // 行の前後の空白を無視する (trim()を使用)
            String trimmedLine = line.trim();

            // 1. 空行の判定
            if (trimmedLine.isEmpty()) {
                continue;
            }

            // 2. 数字とカンマ以外の文字が含まれていないか、また、数字とカンマのみで構成されているかを確認
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

            // 3. 妥当性の判定: 1個以上の数字列がカンマで区切られているか
            // 末尾のカンマは許容する。
            
            // 処理対象の文字列から末尾のカンマを取り除く（もしあれば）
            String content = trimmedLine;
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }

            // カンマで分割して、空でない要素が1つ以上あるかを確認する
            // ただし、カンマが連続している場合や、カンマのみの場合も考慮する必要がある。
            
            // 妥当な行の定義：「1 個以上の数字列がカンマで区切られて並んでいる」
            // これは、カンマで区切った結果、少なくとも1つ以上の数字列が存在すれば良いことを意味する。
            // 例: "1,2,3" -> ["1", "2", "3"] (OK)
            // 例: "," -> ["", ""] (NG, 数字列が0個)
            // 例: "" (すでに除外済み)
            // 例: "," (末尾のカンマのみ) -> contentは空になる (NG)
            
            // 空白を削除した後の文字列をカンマで分割する
            String[] parts = content.split(",");
            
            // 少なくとも1つの要素が存在し、かつその要素の中に数字列が含まれているかを確認する。
            // ここでは、各要素が数字列（空でない文字列）である必要がある。
            boolean hasDigits = false;
            for (String part : parts) {
                if (!part.isEmpty()) {
                    // 部分が全て数字であるかを確認（仕様では「数字列」とあるため）
                    try {
                        Integer.parseInt(part);
                        hasDigits = true;
                    } catch (NumberFormatException e) {
                        // これは、上記のisValidFormatチェックで既に否定されているはずだが、念のため
                        isValidFormat = false;
                        break;
                    }
                }
            }
            
            // 最終的な妥当性の判定
            if (hasDigits) {
                validLines++;
            }
        }

        // 結果の出力
        System.out.println("valid=" + validLines);
        scanner.close();
    }
}
