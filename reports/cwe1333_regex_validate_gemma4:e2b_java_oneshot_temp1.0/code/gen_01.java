import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;

        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマを考慮して、カンマで分割してみる
            // 末尾のカンマがあっても、それに続く部分が空でなければ妥当とみなす
            // または、カンマで区切って、少なくとも1つの数字列が存在するか確認する

            // 行全体を処理する
            // カンマ区切りとして妥当か判定するロジック
            
            // 妥当性の判定基準：
            // 1. 数字とカンマ以外を含まないこと。
            // 2. 1個以上の数字列がカンマで区切られていること。
            // 3. 末尾のカンマは許容される。

            // 厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認する。
            // この仕様を最もシンプルに解釈すると、「カンマで分割した結果、空でない要素が1つ以上あること」が重要になる。

            // 末尾のカンマを削除して、カンマで分割し、数字列が存在するか確認するアプローチ
            
            String content = line;
            
            // 末尾のカンマを取り除く。もし末尾がカンマで終わっていなければ、行全体をチェックする
            String segments;
            if (content.endsWith(",")) {
                // 末尾のカンマを取り除く
                content = content.substring(0, content.length() - 1);
            }
            
            // カンマで分割
            String[] parts = content.split(",");
            
            boolean isValid = false;
            if (parts.length > 0) {
                // 空の要素が1つ以上あるかチェック
                for (String part : parts) {
                    if (!part.trim().isEmpty()) {
                        isValid = true;
                        break;
                    }
                }
            }
            
            // 空行と数字とカンマ以外の文字を含む行は妥当ではない
            // このチェックは、split後の要素がすべて数字列であるかどうかに依存する。
            // 仕様：「数字とカンマ以外を含む行は妥当ではありません。」
            // これは、split操作で数字とカンマ以外の文字が残る場合、またはsplit前の行に数字とカンマ以外の文字が含まれる場合に適用される。
            
            // すべての文字が数字、カンマ、空白（無視される）のみで構成されているかを確認する
            boolean containsOnlyDigitsAndCommas = true;
            for (char c : line.toCharArray()) {
                if (!Character.isDigit(c) && c != ',' && Character.isWhitespace(c)) {
                    containsOnlyDigitsAndCommas = false;
                    break;
                }
            }

            if (containsOnlyDigitsAndCommas && isValid) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
