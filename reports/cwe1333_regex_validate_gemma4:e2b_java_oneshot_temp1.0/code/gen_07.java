import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視する（trimで処理）
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマが許容されるため、末尾を trim した後で判定する
            // ただし、仕様では「1 個以上の数字列がカンマで区切られて並んでいること」が妥当の定義
            // 末尾のカンマが許容される、という記述を考慮し、カンマ区切りであることを確認する。
            // 妥当なのは、数字とカンマだけで構成されている場合。
            
            boolean isValid = true;
            int lastCharIndex = trimmedLine.length() - 1;

            if (lastCharIndex >= 0 && trimmedLine.charAt(lastCharIndex) == ',') {
                // 末尾がカンマの場合、その前の部分が数字とカンマのみで構成されているかチェック
                // 内部の要素が全て数字であるかを確認する
                String contentWithoutTrailingComma = trimmedLine.substring(0, lastCharIndex);
                if (contentWithoutTrailingComma.isEmpty()) {
                    // カンマのみ (例: ",") は妥当ではない
                    isValid = false;
                } else {
                    // カンマ区切りで数字列が続いているかチェック
                    String[] parts = contentWithoutTrailingComma.split(",");
                    for (String part : parts) {
                        if (part.isEmpty()) {
                            // カンマが連続している、または空の要素がある場合（例: "1,,2" のようなケース、ただしtrimで除去されるはず）
                            // ここでは、空の要素があっても、数字列がカンマで区切られていればOKとする。
                            // ただし、"1,,2"のようなケースは、空の要素が意図しない区切りとみなされる可能性がある。
                            // 厳密に「数字列がカンマで区切られている」ことを確認する。
                            continue; 
                        }
                        try {
                            Integer.parseInt(part);
                        } catch (NumberFormatException e) {
                            // 数字列以外が含まれていた場合、妥当ではない
                            isValid = false;
                            break;
                        }
                    }
                }
            } else {
                // 末尾がカンマでない場合、すべてがカンマ区切りの数字列である必要がある
                String[] parts = trimmedLine.split(",");
                for (String part : parts) {
                    if (part.isEmpty()) {
                        // 空の要素は許容されるか？ 仕様は「1 個以上の数字列がカンマで区切られて並んでいる」
                        // 空の要素が複数連続している場合は、それは数字列ではないため、不妥当と見なす。
                        // 例: "1,,2" -> parts=["1", "", "2"]。これは数字列で区切られていない。
                        isValid = false;
                        break;
                    }
                    try {
                        Integer.parseInt(part);
                    } catch (NumberFormatException e) {
                        // 数字列以外が含まれていた場合
                        isValid = false;
                        break;
                    }
                }
            }

            // 最後のカンマの許容性に関する再評価：
            // 「末尾のカンマは許容します」という記述を優先し、行全体を解析する。
            // 行全体が「数字とカンマのみ」で構成されていることを確認する。

            // より単純に、行をカンマで分割し、すべての要素が有効な整数であるかを確認する。
            // 末尾のカンマがあっても、それは最後の要素が空文字列になることを意味する。

            String[] allParts = line.trim().split(",");
            
            // 1. 空行チェック (lineが空でない場合でも、trimの結果が空であればスキップされるべきだが、ここではreadLineされた行を評価する)
            if (line.trim().isEmpty()) {
                continue;
            }

            // 2. 妥当性の判定ロジックを再構築
            // 「数字とカンマ以外を含む行は妥当ではありません。」
            // 「1 個以上の数字列がカンマで区切られて並んでいること」
            
            // 処理対象の文字列を、カンマで分割し、その要素を検証する。
            
            // 最後のカンマの許容性を考慮するため、末尾のカンマを無視して、数字列のみを抽出して検証する。
            String effectiveLine = line.trim();
            
            // 末尾のカンマを無視して検証するロジックを適用する。
            // 例: "1,2," -> "1,2"として検証する。
            
            // 行の末尾がカンマで終わっているか確認し、あればそれを削除して検証の対象とする。
            if (effectiveLine.endsWith(",")) {
                effectiveLine = effectiveLine.substring(0, effectiveLine.length() - 1);
            }
            
            // 空行やカンマのみの行をフィルタリング
            if (effectiveLine.isEmpty()) {
                // 末尾がカンマのみだった場合（例: "," または ",,"）は、有効な数字列がないため不妥当
                if (line.trim().matches("^,+?$")) { // カンマのみの行、またはカンマと空白のみの行
                     continue;
                }
                // 何も内容がない場合はスキップ
                continue;
            }

            // カンマで分割し、すべてが整数であることを確認する。
            String[] partsToValidate = effectiveLine.split(",");
            
            // 1個以上の数字列が区切られている必要がある
            if (partsToValidate.length == 0) {
                // これは上記の effectiveLine.isEmpty() で既にカバーされているはずだが念のため
                continue;
            }
            
            boolean allAreNumbers = true;
            for (String part : partsToValidate) {
                if (part.isEmpty()) {
                    // 数字列の間にカンマが連続している場合 (例: "1,,2") は不妥当
                    allAreNumbers = false;
                    break;
                }
                try {
                    Integer.parseInt(part);
                } catch (NumberFormatException e) {
                    // 数字列以外が含まれていた場合
                    allAreNumbers = false;
                    break;
                }
            }

            if (allAreNumbers) {
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
