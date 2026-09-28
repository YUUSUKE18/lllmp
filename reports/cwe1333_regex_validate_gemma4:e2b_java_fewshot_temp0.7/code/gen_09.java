import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視して、カンマ区切りの整数列として妥当かを判定する
            // 妥当なのは「1個以上の数字列がカンマで区切られて並んでいること」、末尾のカンマは許容されること。
            
            // 行全体をトリムして、末尾の空白を除去する
            String trimmedLine = line.trim();
            
            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマがあれば取り除く（末尾のカンマは許容されるため、区切り文字としてのみ見る）
            String content = trimmedLine;
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }
            
            // カンマで分割して、空でない要素があるか、そして全てが整数であるかをチェックする
            String[] parts = content.split(",");
            
            // 1個以上の数字列がカンマで区切られているか、かつそれらが全て整数であるかを確認する
            boolean isValid = true;
            if (parts.length == 0) {
                // これは上記のtrimmedLine.isEmpty()で既に除外されているはずだが念のため
                isValid = false;
            } else {
                for (String part : parts) {
                    // 各部分をトリムして、それが空でなければ整数であるかチェックする
                    String trimmedPart = part.trim();
                    if (trimmedPart.isEmpty()) {
                        // カンマが連続している場合（例: ",,"）は許容されないと解釈する（「1個以上の数字列」が必須）
                        // ただし、仕様では「1個以上の数字列がカンマで区切られて並んでいること」なので、
                        // 空の要素が混ざることを許容しないと考えるのが自然。
                        isValid = false;
                        break;
                    }
                    try {
                        Integer.parseInt(trimmedPart);
                    } catch (NumberFormatException e) {
                        // 数字とカンマ以外を含む行は妥当ではない
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
