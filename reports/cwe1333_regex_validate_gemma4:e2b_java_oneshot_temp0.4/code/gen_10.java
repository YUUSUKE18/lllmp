import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // カンマ区切りの整数列として妥当か判定
            // 妥当なのは1個以上の数字列がカンマで区切られている場合。
            // 末尾のカンマは許容される。
            
            // 1. 末尾のカンマを取り除く（末尾のカンマは許容されるため、区切り文字として扱う）
            String processedLine = trimmedLine;
            if (processedLine.endsWith(",")) {
                processedLine = processedLine.substring(0, processedLine.length() - 1);
            }

            // 2. カンマで分割し、各要素が整数であることを確認する
            String[] parts = processedLine.split(",");
            
            // 妥当なのは1個以上の数字列がカンマで区切られている場合。
            // partsの要素が空でないことを確認する。
            boolean isCommaSeparated = false;
            for (String part : parts) {
                if (!part.isEmpty()) {
                    isCommaSeparated = true;
                }
            }

            // 3. 数字のみで構成されているか確認する（数字とカンマ以外を含む行は妥当ではない）
            boolean containsOnlyDigitsAndCommas = true;
            for (char c : trimmedLine.toCharArray()) {
                if (!Character.isDigit(c) && c != ',' && Character.isWhitespace(c)) {
                    containsOnlyDigitsAndCommas = false;
                    break;
                }
            }

            // 妥当な条件: 1個以上の数字列がカンマで区切られて並んでいること。
            // この仕様は、"1 個以上の数字列がカンマで区切られて並んでいる"ことを意味する。
            // 例: "1,2,3" -> 3つの数字列
            // 例: "1," -> 1つの数字列とカンマ
            // 例: "123" -> 1つの数字列（カンマなし）
            
            // 厳密に「1 個以上の数字列がカンマで区切られて並んでいる」をチェックする。
            // これは、カンマで分割した結果、少なくとも1つ空でない要素が存在すること、
            // かつ、その要素がすべて整数であることを意味する。
            
            // 簡略化された解釈: カンマで区切られた要素がすべて整数であり、少なくとも1つの要素があること。
            // 末尾のカンマは許容される。
            
            // 再評価: 「1 個以上の数字列がカンマで区切られて並んでいる」
            // "1,2" -> 2つの数字列
            // "1," -> 1つの数字列とカンマ
            // "123" -> 1つの数字列（カンマなし）
            
            // 妥当性の判定を、カンマで分割した結果、空でない要素が1つ以上存在し、
            // その要素がすべて整数であること、および、行が数字とカンマのみで構成されていることとする。

            boolean isTrulyValid = false;
            if (!processedLine.isEmpty()) {
                // カンマで分割した要素がすべて整数であるか確認
                boolean allAreIntegers = true;
                for (String part : parts) {
                    if (!part.isEmpty()) {
                        try {
                            Integer.parseInt(part);
                        } catch (NumberFormatException e) {
                            allAreIntegers = false;
                            break;
                        }
                    }
                }
                
                // 1個以上の数字列が区切られているか（つまり、少なくとも1つの非空の要素があるか）
                if (allAreIntegers && parts.length > 0) {
                    // 最後の要素が空でもOK（末尾のカンマが許容されるため）
                    isTrulyValid = true;
                }
            }
            
            // さらに、数字とカンマ以外を含まないことを確認する（空行以外は、数字とカンマのみで構成されている必要がある）
            if (isTrulyValid) {
                // 念のため、元の行が数字とカンマのみで構成されているか再確認
                boolean containsOnlyDigitsAndCommas = true;
                for (char c : trimmedLine.toCharArray()) {
                    if (!Character.isDigit(c) && c != ',' && !Character.isWhitespace(c)) {
                        containsOnlyDigitsAndCommas = false;
                        break;
                    }
                }
                
                if (containsOnlyDigitsAndCommas) {
                    validCount++;
                }
            }
        }

        System.out.println("valid=" + validCount);
    }
}
