import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視して処理
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // カンマ区切りの整数列として妥当か判定
            // 妥当なのは、カンマで区切られた1個以上の数字列が並んでいる場合。
            // 末尾のカンマは許容される。
            
            // 1. 末尾のカンマを取り除く（末尾のカンマは許容されるため、区切り文字として扱う）
            String processedLine = trimmedLine;
            if (processedLine.endsWith(",")) {
                processedLine = processedLine.substring(0, processedLine.length() - 1);
            }

            // 2. カンマで分割する
            String[] parts = processedLine.split(",");

            // 3. 妥当性のチェック
            // 妥当であるためには、少なくとも1つの数字列が存在する必要がある。
            // 空の要素が複数連続したり、数字とカンマ以外の文字が含まれていたりしないことを確認する必要がある。
            
            boolean is_valid = false;
            if (parts.length > 0) {
                // 各部分が空でないことを確認し、すべてが整数であることを確認する
                boolean allAreIntegers = true;
                for (String part : parts) {
                    if (part.isEmpty()) {
                        // カンマが連続している場合（例: "1,,2" や ",1" など）
                        // 仕様では「1個以上の数字列がカンマで区切られて並んでいる」必要がある。
                        // 空の要素が複数連続している場合は、妥当ではないと解釈する。
                        // ただし、末尾のカンマは許容されるため、splitの結果が空文字列を含むかどうかで判断する。
                        continue; // 空の要素は無視する（後で全体の妥当性をチェック）
                    }
                    try {
                        Integer.parseInt(part.trim());
                    } catch (NumberFormatException e) {
                        // 数字とカンマ以外の文字が含まれている場合
                        allAreIntegers = false;
                        break;
                    }
                }
                
                // 妥当なのは、少なくとも1つの有効な数字列が存在する場合。
                // 厳密には「1個以上の数字列がカンマで区切られて並んでいる」必要がある。
                // これは、カンマで分割した結果、少なくとも1つの非空の文字列（数字列）が存在すれば良い、と解釈する。
                if (parts.length > 0 && (parts.length == 1 || java.util.Arrays.stream(parts).anyMatch(p -> !p.trim().isEmpty()))) {
                    is_valid = true;
                }
            }
            
            // 再評価：仕様をより厳密に解釈する。
            // 「1個以上の数字列がカンマで区切られて並んでいる」
            // 例: "1,2" -> 2つの数字列。妥当。
            // 例: "1," -> 1つの数字列（1）。妥当。
            // 例: "," -> 0個の数字列。不妥当。
            // 例: "abc" -> 0個の数字列（数字とカンマ以外）。不妥当。
            // 例: "1,a" -> 1個の数字列(1)と1個の非数字列(a)。不妥当。

            // 妥当性の再チェックロジック
            boolean trulyValid = false;
            if (trimmedLine.isEmpty()) {
                trulyValid = false;
            } else {
                // カンマで分割し、各要素が数字のみで構成されているか、または空文字列であるかをチェック
                String[] actualParts = trimmedLine.split(",");
                
                // 少なくとも1つの要素が数字のみで構成されている必要がある
                for (String part : actualParts) {
                    String trimmedPart = part.trim();
                    if (!trimmedPart.isEmpty()) {
                        try {
                            Integer.parseInt(trimmedPart);
                            trulyValid = true;
                            break; // 1つでも有効な数字列があればOK
                        } catch (NumberFormatException e) {
                            // 数字とカンマ以外の文字が含まれている場合、この行全体は不妥当
                            trulyValid = false;
                            break;
                        }
                    }
                }
            }


            if (trulyValid) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
