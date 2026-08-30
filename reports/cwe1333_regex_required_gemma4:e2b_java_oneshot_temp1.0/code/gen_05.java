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
            // 正規表現の解説:
            // ^\s*           : 行の先頭から任意の空白文字
            // (?:            : 非キャプチャグループの開始 (ここでは、数字とカンマのパターンを繰り返し)
            //     \d+        : 1つ以上の数字
            //     ,?         : 0個または1個のカンマ
            // )+             : 上記のグループが1回以上繰り返される
            // \s*$           : 行の末尾の任意の空白文字
            // これにより、「カンマ区切りの整数列」がカンマで区切られている形式を判定します。
            // ただし、仕様の「末尾のカンマは許容」という点を考慮するため、より柔軟なパターンを使います。
            
            // 妥当性の判定ロジックを工夫します。
            // 妥当な行とは、「1個以上の数字列がカンマで区切られて並んでいる」こと。
            // 末尾のカンマは許容されます。

            // パターンA: 数字とカンマのみで構成され、少なくとも1つの数字が存在するパターン
            // ^\s*                  : 行頭の空白
            // (?:                : 非キャプチャグループ開始
            //     \d+            : 1つ以上の数字
            //     ,?             : 0個または1個のカンマ
            // )+                 : 上記が1回以上繰り返される
            // .*?                 : その後に続く任意の文字（末尾のカンマなどに対応）
            // \s*$                : 行末の空白
            
            // 仕様に合わせて、行全体がカンマ区切りの整数列であること、かつ数字が含まれていることを確認します。
            // 末尾のカンマが許容されるため、ここでは「数字とカンマのみ」で構成されているかをチェックします。
            
            // 正確な判定として、数字とカンマのみで構成され、かつ数字が一つ以上含まれているかをチェックします。
            // 末尾のカンマを許容するため、行末にカンマがあってもOKです。
            
            // 正規表現: 行が数字とカンマ（および空白）のみで構成されており、かつ少なくとも1つの数字が含まれていることを確認します。
            // シンプルに、「数字とカンマ」で構成されていることを重視し、空行や不正文字を排除します。
            // 以下のパターンは、行が「数字とカンマのシーケンス」であるかをチェックし、少なくとも1つの数字が含まれることを確認します。
            String regex = "^\\s*([0-9,]*[0-9])\\s*.*$";
            
            // 簡略化のため、まずトリムして、数字とカンマのみで構成されているかをチェックします。
            // 正規表現で「数字とカンマのみ」をチェックし、空行やその他の文字を排除します。
            
            String trimmedLine = line.trim();
            boolean isValid = false;

            if (!trimmedLine.isEmpty()) {
                // 1. 数字とカンマのみで構成されているかを確認
                // 数字とカンマ以外の文字が含まれていたら不正
                boolean containsOnlyDigitsAndCommas = trimmedLine.matches("^[0-9,]*$");
                
                if (containsOnlyDigitsAndCommas) {
                    // 2. 少なくとも1つの数字が含まれているかを確認
                    // 数字が含まれていれば、それは「1個以上の数字列がカンマで区切られている」可能性が高い（末尾のカンマは許容されるため）
                    boolean containsDigit = trimmedLine.matches(".*\\d.*");
                    
                    if (containsDigit) {
                        validLines++;
                    }
                }
            }
        }

        System.out.println("valid=" + validLines);
    }
}
