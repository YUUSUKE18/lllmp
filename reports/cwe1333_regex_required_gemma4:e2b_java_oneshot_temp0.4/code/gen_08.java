import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        // カンマ区切りの整数列を判定するための正規表現
        // ^\s* は行頭の空白を許容
        // (?:[0-9]+(?:,|$))+ は1つ以上の数字とカンマの組み合わせ（数字の後にカンマが続くか、行末か）
        // .* は行末の任意の文字（末尾のカンマなど）を許容するために使用するが、ここではより厳密に構造をチェックする
        // 妥当性の定義: 1個以上の数字列がカンマで区切られて並んでいること。末尾のカンマは許容。
        // 許容されるパターン: 数字,数字,数字,... または 数字,数字,...
        // より厳密に「1個以上の数字列がカンマで区切られている」ことを確認する。
        // 例: 1,2,3 または 1,2,3,
        // 数字とカンマのみで構成され、少なくとも1つの数字が含まれていることを確認する。
        // 正規表現の設計: \s* (数字, の繰り返し) \s*
        // 少なくとも1つの数字が含まれていることを保証するため、数字の存在を必須とする。
        String pattern = "^\\s*([0-9]+(?:,\\s*[0-9]+)*)[,\\s]*$";

        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマのみの行（例: "," や ",,"）は妥当ではない（1個以上の数字列が必要）
            // 末尾のカンマが許容されるという仕様を考慮し、数字が少なくとも1つ含まれていることを確認する。
            // 妥当な行は、カンマで区切られた数字の列が1つ以上存在すること。
            
            // 正規表現で判定
            // 1. 行全体が数字とカンマのみで構成されていること
            // 2. 少なくとも1つの数字が含まれていること
            // 3. 末尾のカンマは許容されること (正規表現で末尾のカンマを許容する)
            
            // 妥当な行の判定ロジックを正規表現で表現するのは複雑なため、
            // 以下のロジックで正規表現を補助的に使用し、最終的な判定を行う。
            
            // 1. 数字とカンマのみで構成されているか、および空行でないかを確認
            // 2. 1個以上の数字列が存在するかを確認
            
            // 簡易的な正規表現で「数字とカンマのみ」かつ「少なくとも1つの数字」をチェック
            // ^\s*([0-9][0-9,]*[0-9])  -> 少なくとも1つの数字が含まれていることを要求
            // この正規表現は、数字が連続していることを要求するため、カンマ区切りを完全に捉えるのは難しい。
            
            // 仕様を再解釈: 「1 個以上の数字列がカンマで区切られて並んでいる」
            // これは、カンマで区切られた要素がすべて整数である、という構造を意味する。
            
            // 妥当な行の判定を、より直接的な文字列操作と正規表現の組み合わせで行う。
            // 妥当な行 = カンマで区切られた要素を分割した結果、要素がすべて整数であり、少なくとも1つの要素がある。
            
            String[] parts = trimmedLine.split(",");
            boolean isValid = false;
            
            if (parts.length > 0) {
                // 末尾のカンマが許容されるため、最後の要素が空文字列でも許容する（例: "1,2," -> ["1", "2", ""]）
                // ただし、空行は除外されているため、このチェックは「数字列」の存在を保証する。
                
                // すべての要素が数字（または空文字列、末尾のカンマによる）であるかを確認し、少なくとも1つの数字列があるか。
                boolean allAreNumbersOrEmpty = true;
                boolean hasNumber = false;
                
                for (String part : parts) {
                    if (part.isEmpty()) {
                        // 末尾のカンマによる空要素は許容される
                        continue;
                    }
                    try {
                        Integer.parseInt(part.trim());
                        hasNumber = true;
                    } catch (NumberFormatException e) {
                        // 数字以外の文字が含まれていれば不正
                        allAreNumbersOrEmpty = false;
                        break;
                    }
                }
                
                if (allAreNumbersOrEmpty && hasNumber) {
                    isValid = true;
                }
            }
            
            if (isValid) {
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
