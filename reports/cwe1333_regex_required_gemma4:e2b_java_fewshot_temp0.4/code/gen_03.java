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
            // ^\s*       : 行の先頭の空白を無視
            // (?:[0-9]+,\s*)* : 1つ以上の (数字 + カンマ + 空白) のグループが0回以上繰り返される (数字列が1つ以上あることを保証)
            // [0-9]+     : 少なくとも1つの数字列が存在すること
            // (?:,\s*[0-9]+)* : 任意の数のカンマと数字列が続くこと
            // \s*$       : 行末の空白を無視
            // 
            // よりシンプルに、「カンマ区切りの整数列」が1つ以上存在し、それ以外に数字とカンマ以外の文字がないことを確認する。
            // 妥当性の定義: 1個以上の数字列がカンマで区切られていること。末尾のカンマは許容。
            
            // パターンを調整: 
            // 1. 数字とカンマのみで構成されていること。
            // 2. 少なくとも1つの数字列が含まれていること。
            // 3. 末尾のカンマは許容されること。
            
            // 妥当な行の判定ロジックを正規表現で表現します。
            // 1. 行全体が数字、カンマ、空白のみで構成されているか？
            // 2. 数字が1つ以上含まれているか？
            
            // 最初の試み: 数字とカンマのみで構成され、数字が少なくとも1つ含まれていることを確認する。
            // ^\s* : 先頭の空白
            // (?:[0-9]+,\s*)* : 0個以上の (数字 + カンマ + 空白) の繰り返し
            // [0-9]+ : 少なくとも1つの数字列
            // (?:,\s*[0-9]+)* : 任意の数のカンマと数字列の繰り返し
            // \s*$ : 末尾の空白
            
            // より簡潔に、行全体が数字とカンマ、空白のみで構成され、数字が少なくとも1つ含まれていることを確認する。
            // 妥当な行の定義: 
            // 1. 数字とカンマ、空白以外の文字を含まない。
            // 2. 少なくとも1つの数字が含まれる。
            
            // 正規表現: 
            // ^\s* : 行頭の空白
            // (?:[0-9]+(?:,\s*[0-9]+)*) : 1つ以上の数字列がカンマで区切られているパターン。
            // (?:,\s*|\s*)? : 末尾のカンマや空白（任意）
            // $ : 行末
            
            // 妥当な行の判定をシンプルに行うため、行をトリムし、数字とカンマのみで構成されているかを確認する。
            String trimmedLine = line.trim();
            boolean isValid = false;

            if (!trimmedLine.isEmpty()) {
                // 1. 数字とカンマ、空白以外の文字が含まれていないか確認
                if (Pattern.matches("^[0-9, ]+$", trimmedLine)) {
                    // 2. 少なくとも1つの数字が含まれているか確認
                    if (Pattern.matches(".*[0-9].*", trimmedLine)) {
                        // 3. 妥当な行としてカウント
                        validLines++;
                    }
                }
            }
        }

        System.out.println("valid=" + validLines);
    }
}
