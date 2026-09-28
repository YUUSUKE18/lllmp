import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;

        String line;
        while ((line = br.readLine()) != null) {
            // 正規表現パターン: カンマで区切られた整数列。
            // ^\s* は行の先頭の空白を許容
            // (?:[\d]+) は1つ以上の数字のグループ (非キャプチャ)
            // (?:,\s*[\d]+)* はカンマとそれに続く空白の繰り返し（0回以上）
            // .* は行の残りの部分（末尾のカンマなども含む）
            // $ は行の終わり
            
            // 妥当性の判定ロジックを工夫します。
            // 仕様: 1 個以上の数字列がカンマで区切られて並んでいること。
            // 末尾のカンマは許容される。空行、および数字とカンマ以外を含む行は妥当ではない。
            
            // 判定基準:
            // 1. 行が完全に空でないこと (ただし、trim()で空になる可能性も考慮)
            // 2. 行が数字とカンマのみで構成されていること。
            // 3. 少なくとも1つの数字列が存在すること。
            
            String trimmedLine = line.trim();
            
            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない (0行)
                continue;
            }

            // 正規表現で「数字とカンマ」のみで構成されているかを確認する
            // ^[\d,]*$ : 行が数字とカンマのみで構成されていることを確認
            // 1. 末尾のカンマが許容されるため、行の最後にカンマがあっても良い。
            // 2. 少なくとも1つの数字が含まれている必要がある。

            // パターンA: 1つ以上の数字とカンマの組み合わせ
            // このパターンは、少なくとも1つの数字を含む、カンマ区切りのデータが想定される。
            // 数字の並びを分離して数えるのが最も確実だが、正規表現で「区切り文字と数字のみ」をチェックする。
            
            // 妥当性の定義を再解釈: 
            // 「1 個以上の数字列がカンマで区切られて並んでいること」
            // これは、行をカンマで分割した結果、空でない要素が1つ以上存在することを意味する。
            
            // 行をカンマで分割し、空でない要素の数を数える方が、正規表現よりも意図に合致する。
            
            String[] parts = line.split(",");
            int count = 0;
            for (String part : parts) {
                if (!part.trim().isEmpty()) {
                    count++;
                }
            }
            
            // 厳密なチェック:
            // 空行 (line.trim().isEmpty()) は除外済み。
            // 数字とカンマ以外を含む行は除外されるべき。
            // この問題文の「数字とカンマ以外を含む行は妥当ではない」という制約は、
            // 分割後の要素がすべて数字（または数字とカンマのみ）であるか、あるいは
            // 全体が数字とカンマのみで構成されているか、という解釈が必要。
            
            // シンプルな解釈: lineがカンマと数字から構成されていることを確認する。
            // 1. lineがカンマで分割して、空でない要素が1つ以上あるか。
            // 2. lineの各文字が数字かカンマか空白であるか。

            boolean isValid = true;
            for (int i = 0; i < line.length(); i++) {
                char c = line.charAt(i);
                if (!Character.isDigit(c) && c != ',' && Character.isWhitespace(c)) {
                    isValid = false;
                    break;
                }
            }
            
            if (isValid) {
                // 空行は既に除外されているため、これ以上、数字列が存在するかを確認する。
                // 1個以上の数字列があること => 分割後の空でない要素の数が1以上。
                // ただし、行が " , , " のようにカンマだけで構成されている場合、数字列は0。
                
                // 再度、最初のロジックで区切られた要素の数を採用する。
                if (count >= 1) {
                    validLines++;
                } else {
                    // 数字とカンマのみで構成されていても、数字列が0個の場合 (例: ",," または " , ")
                    // これは「1個以上の数字列がカンマで区切られて並んでいる」を満たさない。
                    // 例: line = ",," -> parts = {"", "", ""} -> count = 0
                }
            }
        }

        System.out.println("valid=" + validLines);
    }
}
