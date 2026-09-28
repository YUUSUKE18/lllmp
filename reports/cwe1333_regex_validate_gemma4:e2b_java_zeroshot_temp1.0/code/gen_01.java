import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 行の前後の空白を無視するため、trim()を使用
            String trimmedLine = line.trim();

            // 1. 空行の判定
            if (trimmedLine.isEmpty()) {
                continue;
            }

            // 2. 数字とカンマ以外の文字が含まれていないかチェック
            boolean containsInvalidChars = false;
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (!Character.isDigit(c) && c != ',') {
                    containsInvalidChars = true;
                    break;
                }
            }
            if (containsInvalidChars) {
                continue;
            }

            // 3. 妥当性の判定
            // 1 個以上の数字列がカンマで区切られて並んでいること。末尾のカンマは許容。
            // 意味のあるデータが存在する場合、少なくとも一つの数字が存在する必要がある。
            // ただし、仕様では「1 個以上の数字列がカンマで区切られて並んでいること」が重要。
            // これは、カンマで区切られた文字列が、カンマで区切られた複数の要素（数字列）で構成されていることを意味する。
            
            // 末尾のカンマを削除して、カンマが存在するか確認する
            String processedLine = trimmedLine;
            if (processedLine.endsWith(",")) {
                processedLine = processedLine.substring(0, processedLine.length() - 1);
            }

            // 処理後の文字列が空でないか（カンマのみで構成された行を許容しない、または数字列が最低1つあることを確認する）
            // 仕様：「1 個以上の数字列がカンマで区切られて並んでいること」
            // 例: "1,2" -> 2つの数字列
            // 例: "1," -> 1つの数字列が区切られていると見なされるか？ (末尾のカンマは許容)
            
            // カンマで分割して、その結果が空でない要素を数えることで、数字列の存在を確認する。
            String[] parts = processedLine.split(",");
            
            // 末尾のカンマが許容されるため、splitの挙動に注意が必要。
            // 最初のチェックで、空行と不正文字を排除したので、残った行は数字とカンマのみ。
            
            // 末尾のカンマの有無に関わらず、分割された要素の中に少なくとも1つの数字列が存在すればOK。
            // ただし、もし入力が "," や ",," のように数字列がない場合は不適当。
            
            boolean hasDigits = false;
            for (String part : parts) {
                // 各部分が数字のみで構成されているか、または数字列として解釈できるかを確認
                if (!part.trim().isEmpty()) {
                    // partがすべて数字のみであることを確認
                    try {
                        Integer.parseInt(part.trim());
                        hasDigits = true;
                    } catch (NumberFormatException e) {
                        // これは既に前のチェックで除外されているはずだが、念のため
                        hasDigits = false; // 不正な部分があればスキップ
                    }
                }
            }

            // もし元の文字列が空文字列だった場合（これは既に除外済み）、または数字列が一つもなかった場合
            if (hasDigits) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
        scanner.close();
    }
}
