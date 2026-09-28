import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視するため、trim()を使用
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマを許容しつつ、数字とカンマのみで構成されているかを確認する
            // 正規表現で「数字とカンマのみ」という条件をチェックする
            // 1つ以上の数字とカンマの組み合わせ、かつ、末尾がカンマまたは数字で終わることを確認する必要がある。
            // 仕様：「1 個以上の数字列がカンマで区切られて並んでいることです。末尾のカンマは許容します。」
            // これは、カンマで区切られた要素がすべて整数である、ということを意味する。

            // 行全体をカンマで分割し、各要素が整数であることを検証する
            String[] parts = trimmedLine.split(",");
            
            if (parts.length == 0) {
                // これは trimmedLine.isEmpty() で既にカバーされているが念のため
                continue;
            }

            boolean isValid = true;
            
            // 各要素が整数であるか、またはカンマのみで構成されているかを確認する
            for (String part : parts) {
                String trimmedPart = part.trim();
                if (trimmedPart.isEmpty()) {
                    // 空の要素は、カンマの連続（例: ,,）や末尾のカンマ（例: 1,2,）として許容されるか？
                    // 仕様は「1 個以上の数字列がカンマで区切られて並んでいる」なので、空の要素は許容されないと解釈する。
                    // ただし、「末尾のカンマは許容します」という条件と矛盾しないように注意が必要。
                    // 例: "1,2," -> parts = {"1", "2", ""}。最後の "" は末尾のカンマの直後なので許容されるべき。
                    // ここでは、空文字列が数字列でない限り、妥当でないと判断する。
                    // ただし、カンマが連続する場合や、数字以外の文字が含まれる場合は不妥当。
                    
                    // 厳密に「数字列」のみを許容する。
                    // 1個以上の数字列がカンマで区切られている、ということを確認する。
                    // 空の要素が紛れ込んだ場合は不妥当とする。
                    isValid = false;
                    break;
                }

                try {
                    // 整数に変換を試みる
                    Integer.parseInt(trimmedPart);
                } catch (NumberFormatException e) {
                    // 数字とカンマ以外を含む、または数字列ではない場合
                    isValid = false;
                    break;
                }
            }

            if (isValid) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
