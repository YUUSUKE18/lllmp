import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.regex.Pattern;

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

            // 妥当性の判定: 1個以上の数字列がカンマで区切られて並んでいること。
            // 末尾のカンマは許容する。
            // 正規表現: 
            // ^: 行の開始
            // (?:[0-9]+(?:,[0-9]+)*): 1つ以上の数字列と、それに続くカンマと数字列の繰り返し。
            // (?:,?[0-9]+)*: 任意の数のカンマと数字列が続く（末尾のカンマを許容するため、全体を調整する）
            // $ : 行の終了
            
            // よりシンプルな判定ロジックとして、カンマで区切られた要素が少なくとも1つ以上存在するかを確認する。
            // 1. 行全体をカンマで分割する。
            // 2. 分割された要素の中に、数字のみで構成される要素が少なくとも1つ存在するか確認する。
            
            // 末尾のカンマを考慮し、行を後処理する
            String processedLine = trimmedLine;
            if (processedLine.endsWith(",")) {
                processedLine = processedLine.substring(0, processedLine.length() - 1);
            }

            // カンマで分割
            String[] parts = processedLine.split(",");
            
            boolean isValid = false;
            for (String part : parts) {
                // 各要素が空でないこと、かつ数字のみで構成されていることを確認する
                if (!part.trim().isEmpty()) {
                    // 数字のみで構成されているかチェック
                    if (part.matches("\\d+")) {
                        isValid = true;
                        break;
                    }
                }
            }
            
            // ただし、仕様は「1 個以上の数字列がカンマで区切られて並んでいること」
            // これは、カンマで区切られた要素が存在し、そのうちの少なくとも1つが数字列である、と解釈するのが自然。
            // もし、カンマで区切られたすべての要素が数字列である、という意味であれば、次のチェックを行う。
            
            // 厳密に「1 個以上の数字列がカンマで区切られて並んでいる」を、
            // 「カンマで区切られた要素の数が1以上であり、その要素の中に数字列が存在する」と解釈する。
            // 空行チェックと数字/カンマ以外を含む行のチェックは既に実施済み。
            // 残るは「1個以上の数字列」の存在確認。
            
            // 最初の処理で、行が空でないこと、数字とカンマ以外を含まないことを確認した。
            // カンマで分割された結果、一つでも数字列があれば妥当とする。
            
            if (isValid) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
