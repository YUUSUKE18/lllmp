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
            // 正規表現パターン: 
            // ^\s*       -> 行頭の任意の空白
            // (?:[0-9]+,\s*)* -> 1つ以上の数字とカンマのグループ（数字とカンマの間に空白があっても良い）
            // [0-9]+     -> 最後の数字列
            // (?:,\s*|$)  -> カンマと空白、または行末
            // $          -> 行末
            // 
            // よりシンプルに、カンマ区切りの整数列が1つ以上存在し、それ以外に数字やカンマ以外の文字がないことを確認する。
            // 妥当な形式: 1つ以上の数字とカンマの組み合わせ、末尾にカンマがあっても良い。
            // 
            // 妥当なパターン: 
            // ^\s*             -> 行頭の空白
            // (?:[0-9]+(?:,\s*[0-9]+)*) -> 1つ以上の数字とカンマの組み合わせ（例: 1,2,3, または 1,2,3,）
            // .*              -> 残りの文字（ここでは、末尾のカンマのみを許容するため、より厳密に）
            
            // 妥当性の判定ロジックを正規表現で表現する。
            // 1. 行が空でないこと。
            // 2. 行が数字とカンマのみで構成されていること（末尾のカンマは許容）。
            
            // 妥当な行の定義: 
            // 1つ以上の数字とカンマのシーケンスが存在し、それ以外の文字がない。
            // 例: "1,2,3" または "1,2," または "1,2,3,"
            
            // パターン: 
            // ^\s*             -> 行頭の空白
            // (?:[0-9]+(?:,\s*[0-9]+)*) -> 1つ以上の数字とカンマの組み合わせ（例: 1,2,3,）
            // (?:,)?           -> 最後のカンマ（オプション）
            // \s*$             -> 行末の空白
            
            // より簡単な判定: 
            // 行をトリムし、その内容が数字とカンマのみで構成されているかを確認する。
            // 厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認する。
            
            String trimmedLine = line.trim();
            boolean isValid = false;

            if (!trimmedLine.isEmpty()) {
                // 1. 行が数字とカンマのみで構成されているかチェック
                // 数字とカンマ以外の文字が含まれていないか確認
                if (Pattern.matches("^[0-9,]*$", trimmedLine)) {
                    // 2. 1個以上の数字列がカンマで区切られているかチェック
                    // カンマが存在し、かつ数字が含まれている必要がある。
                    if (trimmedLine.contains(",")) {
                        // カンマが含まれていれば、それが区切りとして機能していると見なす。
                        // ただし、"1," や "," のようなケースは除外したい。
                        
                        // 複数の数字列が存在するかどうかをチェックする。
                        // カンマで分割してみて、空でない要素が2つ以上あればOKとする。
                        String[] parts = trimmedLine.split(",");
                        boolean hasNumbers = false;
                        for (String part : parts) {
                            if (!part.trim().isEmpty() && Pattern.matches("\\d+", part.trim())) {
                                hasNumbers = true;
                            }
                        }
                        
                        if (hasNumbers) {
                            isValid = true;
                        }
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
