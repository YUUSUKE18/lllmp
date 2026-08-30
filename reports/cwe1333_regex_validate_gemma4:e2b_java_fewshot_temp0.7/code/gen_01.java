import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視して処理する
            String trimmedLine = line.trim();
            
            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // カンマ区切りの整数列として妥当か判定
            // 妥当条件: 1個以上の数字列がカンマで区切られていること。末尾のカンマは許容。
            
            // 末尾のカンマを取り除く（許容されるため）
            String processedLine = trimmedLine;
            if (processedLine.endsWith(",")) {
                processedLine = processedLine.substring(0, processedLine.length() - 1);
            }

            // カンマで分割して、空でない要素が1つ以上あるか確認する
            String[] parts = processedLine.split(",");
            
            boolean isValid = false;
            for (String part : parts) {
                if (!part.trim().isEmpty()) {
                    // 各部分が整数であるかチェック
                    try {
                        Integer.parseInt(part.trim());
                        // 少なくとも1つの有効な整数列が見つかれば妥当
                        isValid = true;
                        break;
                    } catch (NumberFormatException e) {
                        // 数字以外が含まれていた場合、この行は妥当ではない（次のループで判定される）
                        // ただし、仕様は「数字とカンマ以外を含む行は妥当ではない」なので、
                        // すべての要素が数字で構成されている必要がある。
                        // ここでは、splitの結果がすべて数字のみで構成されているかを確認する。
                        // 仕様を再解釈すると、「カンマで区切られた各要素が整数であること」が妥当性の主要な部分となる。
                        // 「数字とカンマ以外を含む行は妥当ではない」は、入力全体が数字とカンマのみで構成されていることを示唆する。
                        // 例1, 2, 3の例から判断すると、各要素が整数であること、そして行全体が数字とカンマのみで構成されていることが要求される。
                        // 今回の課題の核心は「1個以上の数字列がカンマで区切られて並んでいること」と「空行/不正文字の排除」である。
                        // ここでは、各要素が整数であるかを厳密にチェックする。
                    }
                }
            }
            
            // より厳密なチェック: 
            // 1. 空行でないこと (trimmedLine.isEmpty()でチェック済み)
            // 2. 数字とカンマ以外を含まないこと。
            // 3. 少なくとも1つの有効な整数列があること。

            // 全ての要素が整数であり、かつカンマで区切られていることを確認する。
            // 厳密に「1個以上の数字列がカンマで区切られて並んでいる」を評価する。
            
            // 再評価: 行全体が数字とカンマのみで構成されているか確認。
            boolean containsOnlyDigitsAndCommas = true;
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (!((c >= '0' && c <= '9') || c == ',')) {
                    containsOnlyDigitsAndCommas = false;
                    break;
                }
            }
            
            if (!containsOnlyDigitsAndCommas) {
                continue; // 不正な文字を含む行はスキップ
            }

            // カンマで分割し、空でない要素が1つ以上あるか確認 (末尾のカンマは許容)
            // 末尾のカンマを削除してから分割し直すことで、区切りがない（例: ","のみ）ケースを除外する。
            String contentToSplit = trimmedLine;
            if (contentToSplit.endsWith(',')) {
                contentToSplit = contentToSplit.substring(0, contentToSplit.length() - 1);
            }
            
            String[] finalParts = contentToSplit.split(",");
            
            // 少なくとも1つの数字列が存在するか（つまり、空の文字列が存在しないか）
            boolean hasNumbers = false;
            for (String part : finalParts) {
                if (!part.trim().isEmpty()) {
                    try {
                        Integer.parseInt(part.trim());
                        hasNumbers = true;
                        break;
                    } catch (NumberFormatException e) {
                        // これは上記でcontainsOnlyDigitsAndCommasチェックで既に除外されているはずだが、念のため
                        // 実際には、containsOnlyDigitsAndCommasがtrueなら、このtry-catchは必ず成功する。
                    }
                }
            }

            if (hasNumbers) {
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
