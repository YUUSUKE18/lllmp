import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視してチェック
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // カンマ区切りの整数列として妥当か判定
            // 妥当とは、1個以上の数字列がカンマで区切られて並んでいること。末尾のカンマは許容。
            
            // 末尾のカンマを取り除いた文字列をチェック
            String content = trimmedLine;
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }
            
            // カンマで分割して、空でない要素があるかを確認する
            // 末尾のカンマを許容するため、split(",")の結果が空文字列を含む可能性があることに注意。
            // ただし、仕様では「1個以上の数字列がカンマで区切られて並んでいる」ことを意味する。
            // 空行は除外済み。残るのは、数字とカンマのみで構成されている必要がある。
            
            // より厳密に、数字とカンマ以外が含まれていないかを確認する必要がある。
            // 仕様：「空行、および数字とカンマ以外を含む行は妥当ではありません。」
            
            boolean isValid = true;
            for (int i = 0; i < content.length(); i++) {
                char c = content.charAt(i);
                if (!Character.isDigit(c) && c != ',') {
                    isValid = false;
                    break;
                }
            }
            
            if (!isValid) {
                continue;
            }

            // カンマで分割し、空でない要素が1つ以上あるかを確認する
            // 末尾のカンマを許容するため、分割後の要素の数で判断する。
            // ただし、最後の要素が空になるケース（例: "1,2," -> ["1", "2", ""]）を考慮する必要がある。
            
            String[] parts = content.split(",");
            
            // 末尾のカンマの有無で判定を調整する。
            // もし元の行が末尾にカンマを持っていた場合、splitの結果の最後の要素は空文字列になる。
            // 例: "1,2," -> parts = ["1", "2", ""]。要素数は3。
            // 妥当なのは、数字列が1つ以上存在する場合。
            
            int actualWordCount = 0;
            for (String part : parts) {
                if (!part.trim().isEmpty()) {
                    actualWordCount++;
                }
            }
            
            if (actualWordCount >= 1) {
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
