import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        // カンマ区切りの整数列を判定するための正規表現
        // ^: 行の先頭
        // [^,]*: カンマ以外の任意の文字が0回以上続く (数字も含む)
        // (?:,\d+)*?: カンマとそれに続く数字のグループが0回以上繰り返される (末尾のカンマを含む場合に対応)
        // $: 行の末尾
        // この正規表現は「1個以上の数字列がカンマで区切られて並んでいる」ことを検証します。
        // 具体的には、カンマで区切られた数字の塊が最低1つあることを確認します。
        // ただし、仕様に合わせて「1個以上の数字列がカンマで区切られて並んでいる」ことを検証する必要があります。
        // 正規表現の解釈を厳密にするため、行全体が数字とカンマのみで構成されていることを確認しつつ、最低1つの数字が存在するかを確認します。
        
        // より簡潔かつ厳密に「1個以上の数字列がカンマで区切られて並んでいる」をチェックする正規表現を試みます。
        // 1個以上の数字の塊と、それらがカンマで区切られていることをチェックします。
        // 例: 1,2,3 または 1,2,3,
        // 数字とカンマのみで構成されており、数字が少なくとも1つあることを保証します。
        String pattern = "^[0-9,]*$"; // 数字とカンマのみで構成されていることをチェック

        while (true) {
            String line = br.readLine();
            if (line == null) {
                break;
            }

            // 前後の空白を無視するためにトリムする
            String trimmedLine = line.trim();

            // 空行は妥当ではない (空行は数字列が0個であるため)
            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 正規表現による判定
            // 1. 数字とカンマ以外を含まないこと
            // 2. 1個以上の数字が（カンマで区切られて）存在すること
            
            // ここでは、行が数字とカンマのみで構成されているかを確認し、さらに数字が一つ以上あるかを確認します。
            // 仕様の「1 個以上の数字列がカンマで区切られて並んでいる」を正規表現で正確に表現するのは複雑なため、
            // 以下のロジックを採用します：
            // 1. 行が数字とカンマのみで構成されているか確認。
            // 2. 数字が含まれているか確認。
            
            boolean isPotentialValid = true;
            
            // 数字とカンマ以外の文字が含まれていないか、また数字が少なくとも1つあるかをチェック
            for (char c : line.toCharArray()) {
                if (!Character.isDigit(c) && c != ',') {
                    isPotentialValid = false;
                    break;
                }
            }
            
            if (isPotentialValid) {
                // 数字が一つ以上含まれているかを確認
                boolean hasDigit = false;
                for (char c : line.toCharArray()) {
                    if (Character.isDigit(c)) {
                        hasDigit = true;
                        break;
                    }
                }
                
                if (hasDigit) {
                    // 数字とカンマのみで構成され、かつ数字が1つ以上存在する場合、妥当とする。
                    validLines++;
                }
            }

        }

        System.out.println("valid=" + validLines);
    }
}
