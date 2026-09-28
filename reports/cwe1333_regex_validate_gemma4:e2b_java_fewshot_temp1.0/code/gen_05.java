import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視する
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // カンマで区切る
            // 末尾のカンマは許容する (例: "1,2," は妥当)
            // 数字とカンマ以外を含む行は妥当ではない
            
            // 妥当性のチェック:
            // 1. 数字とカンマ以外の文字が含まれていないこと。
            // 2. 1個以上の数字列がカンマで区切られていること。（ただし末尾のカンマは許容）

            // 処理のために、行をカンマで分割する
            String[] parts = line.split(",");
            
            boolean isValid = true;
            
            // 少なくとも1つの要素が存在するかを確認する（末尾のカンマで空要素になる可能性があるため注意）
            // 例: "1,2," -> ["1", "2", ""] (split(",")の結果)
            // この仕様では「1個以上の数字列がカンマで区切られて並んでいること」が重要。
            
            // 妥当な要素が少なくとも1つ存在するか確認
            boolean hasContent = false;
            for (String part : parts) {
                if (!part.trim().isEmpty()) {
                    hasContent = true;
                }
            }

            // 1. 数字とカンマ以外が含まれていないかを確認する
            // このチェックは、splitの結果の要素がすべて数字または空文字列（カンマの後に続く空文字列）で構成されていることを確認する。
            // より厳密に、元の行を数字とカンマだけで構成されているかを確認する。
            
            StringBuilder content = new StringBuilder();
            boolean containsInvalidChar = false;
            for (int i = 0; i < line.length(); i++) {
                char c = line.charAt(i);
                if (c != ',' && Character.isDigit(c)) {
                    content.append(c);
                } else if (c != ',') {
                    // 数字でもカンマでもない文字があれば不正
                    containsInvalidChar = true;
                    break;
                }
            }
            
            if (containsInvalidChar) {
                // 数字とカンマ以外を含む行は妥当ではない
                continue;
            }

            // 2. 1個以上の数字列が区切られているか確認する
            // 妥当な行は、カンマで区切られて、少なくとも1つの非空の数字列が存在すること。
            // 末尾のカンマは許容される。
            
            // line.split(",")の結果を再評価する
            // 末尾のカンマが許容されるため、空要素が複数存在しても問題ないが、
            // 妥当であるためには、少なくとも1つの非空の要素（数字）が存在する必要がある。
            
            int count = 0;
            for (String part : line.split(",")) {
                if (!part.trim().isEmpty()) {
                    count++;
                }
            }
            
            // 末尾のカンマが許容されるため、行が" ,"のようなもの以外で、
            // 数字とカンマだけで構成されていれば妥当と判断する。
            // 妥当とは「1個以上の数字列がカンマで区切られて並んでいること」
            if (count >= 1) {
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
