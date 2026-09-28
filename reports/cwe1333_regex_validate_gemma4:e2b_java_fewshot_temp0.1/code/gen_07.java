import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視して処理
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマを許容しつつ、数字とカンマのみで構成されているかチェックする
            // 正規表現でチェックする代わりに、手動でチェックする方がシンプルで意図に沿う可能性がある
            // 妥当な行の定義: 1個以上の数字列がカンマで区切られて並んでいる。末尾のカンマは許容。
            
            boolean isValid = true;
            int lastCharIndex = trimmedLine.length() - 1;

            // 末尾がカンマの場合、その直前が数字で終わっているか、またはカンマのみで終わっているかを確認する
            if (trimmedLine.endsWith(",")) {
                // 末尾がカンマの場合、カンマを除いた部分が空でないことを確認する
                String content = trimmedLine.substring(0, lastCharIndex);
                if (content.isEmpty()) {
                    // 例: "," のようなケースは許容しない（空行チェックで既に除外されているが念のため）
                    isValid = false;
                }
            } else {
                // 末尾がカンマでない場合、カンマで区切られた数字列のみで構成されているか確認する
                String[] parts = trimmedLine.split(",");
                
                // 1. すべての要素が数字列（または空文字列、ただしカンマ区切りで空文字列は許容されない）であるか確認
                for (String part : parts) {
                    if (part.isEmpty()) {
                        // カンマが連続している場合 (例: "1,,2") や、先頭/末尾のカンマ処理で生じた空文字列
                        // ただし、split(",")の結果、"1,,2" -> ["1", "", "2"] となる。
                        // 妥当なのは「1個以上の数字列がカンマで区切られている」こと。
                        // 空の要素は許容しない。
                        isValid = false;
                        break;
                    }
                    // 数字列であるか確認
                    try {
                        Integer.parseInt(part);
                    } catch (NumberFormatException e) {
                        // 数字以外の文字が含まれている場合
                        isValid = false;
                        break;
                    }
                }
            }

            if (isValid) {
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
