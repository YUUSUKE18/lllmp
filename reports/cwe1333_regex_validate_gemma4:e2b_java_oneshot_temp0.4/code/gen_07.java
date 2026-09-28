import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視して、行を処理する
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // カンマ区切りの整数列として妥当か判定する
            // 妥当なのは、1個以上の数字列がカンマで区切られている場合。
            // 末尾のカンマは許容される。

            // 1. 末尾のカンマを取り除く（許容される場合）
            String processedLine = trimmedLine;
            if (processedLine.endsWith(",")) {
                processedLine = processedLine.substring(0, processedLine.length() - 1);
            }

            // 2. カンマで分割して、要素が存在するか確認する
            // 複数の要素（数字列）が存在する場合、カンマで分割した結果の要素数が1以上である必要がある。
            String[] parts = processedLine.split(",");

            // 妥当性のチェック：
            // 1. 分割された要素が空でないこと（数字列が存在すること）
            // 2. 元の行が空行でなかったこと（既にチェック済み）
            // 3. 数字とカンマ以外が含まれていないこと (splitで数字列のみが残ればOK)

            boolean isValid = true;
            for (String part : parts) {
                // 各部分が空でなければ、それは数字列（または空文字列がカンマの連続などで生じた場合）
                // 厳密には、"1,2," -> split -> ["1", "2", ""]。空文字列は許容されるか？
                // 仕様：「1 個以上の数字列がカンマで区切られて並んでいる」
                // 例: "1,2" -> ["1", "2"] (2個の数字列) -> 妥当
                // 例: "1," -> split("1") -> ["1", ""] (2要素) -> 妥当 (末尾のカンマ許容)
                // 例: "," -> split("") -> ["", ""] (2要素) -> 妥当？ (数字列が0個) -> 不妥当
                // 例: "1,,2" -> split("1,,2") -> ["1", "", "2"] (数字列が2個) -> 妥当 (空要素が許容されるか？)

                // 妥当なのは、数字列が1個以上存在すること。
                if (part.length() > 0) {
                    // 数字列であるか確認
                    try {
                        Integer.parseInt(part);
                    } catch (NumberFormatException e) {
                        // 数字列以外が含まれていた場合、妥当ではない
                        isValid = false;
                        break;
                    }
                }
            }

            // 最後の要素が空文字列の場合、それは末尾のカンマに対応しているか、連続カンマに対応している。
            // 妥当なのは、少なくとも1つの有効な数字列が存在すること。
            // 処理後の文字列が空でなければ、少なくとも1つの要素（数字列または空文字列）が存在する。
            // 妥当なのは、数字列が1個以上存在すること。

            // 再評価：最も簡単な妥当性の判定は、カンマで分割した結果、数字列が1個以上存在するかどうか。
            // 1. "1,2" -> ["1", "2"] (2個) -> OK
            // 2. "1," -> "1" -> ["1"] (1個) -> OK
            // 3. "," -> "" -> ["", ""] (0個の数字列) -> NG
            // 4. "abc" -> ["abc"] (1個) -> NG (数字列ではない)

            boolean finalIsValid = false;
            if (trimmedLine.length() > 0) {
                // 厳密に、数字とカンマのみで構成され、少なくとも1つの数字列が存在するかどうかをチェックする。
                // 正規表現でチェックする方が簡潔で安全。
                // 許容されるパターン: 数字とカンマのみ。末尾はカンマ許容。
                // 以下の正規表現は、数字とカンマのみで構成され、空行ではないことを確認する。
                // ^[0-9,]*$ : 数字とカンマのみ
                // 最後のカンマは許容されるため、末尾のカンマを考慮する必要がある。

                // 妥当な行の定義を再解釈: 1個以上の数字列がカンマで区切られている。
                // これは、カンマで区切った際に、少なくとも1つの非空の数字列が存在すれば良い。

                // 処理をシンプルにするため、入力文字列が数字とカンマのみで構成されているかを確認し、
                // その後、数字列が1つ以上存在するかを確認する。
                
                // 1. 数字とカンマのみで構成されているか？
                boolean containsOnlyDigitsAndCommas = true;
                for (char c : trimmedLine.toCharArray()) {
                    if (!((c >= '0' && c <= '9') || c == ',')) {
                        containsOnlyDigitsAndCommas = false;
                        break;
                    }
                }

                if (containsOnlyDigitsAndCommas) {
                    // 2. 少なくとも1つの数字列が存在するか？
                    // カンマで分割し、空でない要素が1つ以上あればOK。
                    String[] actualParts = trimmedLine.split(",");
                    boolean hasNumber = false;
                    for (String part : actualParts) {
                        if (!part.isEmpty()) {
                            // 数字列であるか確認（既に上記で数字とカンマのみ確認済みだが念のため）
                            try {
                                Integer.parseInt(part);
                                hasNumber = true;
                            } catch (NumberFormatException e) {
                                // これは上記のcontainsOnlyDigitsAndCommasチェックで既に排除されているはずだが、念のため
                                hasNumber = false; 
                            }
                        }
                    }
                    
                    if (hasNumber) {
                        validCount++;
                    }
                }
            }
        }

        System.out.println("valid=" + validCount);
    }
}
