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
            // ^\s*          -> 行の先頭の空白を無視
            // (?:[0-9]+,\s*)* -> 1個以上の数字とカンマのグループ（数字とカンマの後に空白があっても良い）が0回以上繰り返される
            // [0-9]+        -> 少なくとも1つの数字が存在する
            // (?:,\s*[0-9]+)* -> カンマとそれに続く数字のグループが0回以上繰り返される
            // \s*$          -> 行末の空白を無視
            // 
            // よりシンプルに「1個以上の数字とカンマの組み合わせ」を許容するパターンを考える。
            // 妥当な形式: 数字,数字,... の形式。末尾のカンマは許容。
            // これは「数字とカンマが混在しているが、数字のみで構成されている」ことを意味する。
            // 妥当な行は、数字とカンマのみで構成され、少なくとも1つの数字が含まれている必要がある。
            // 例: "1,2,3" や "1,2," は妥当。
            // 空行は妥当ではない。数字とカンマ以外は妥当ではない。
            
            // 妥当な行の判定ロジックを正規表現で表現する。
            // 1. 行が完全に空でないこと。
            // 2. 行が数字とカンマのみで構成されていること。
            // 3. 少なくとも1つの数字が含まれていること。
            
            // 正規表現の試み: 
            // ^\s*             // 行頭の空白
            // (?:[0-9]+(?:,.*)?)* // 任意の数字とカンマの組み合わせ
            // \s*$             // 行末の空白
            
            // より厳密に「カンマ区切りの整数列」を判定する。
            // 妥当な行は、数字とカンマのみで構成され、少なくとも1つの数字が含まれている。
            // 例: "1,2" または "1," または ",1" (末尾のカンマは許容)
            
            // 妥当な行のパターン: 
            // 1. 少なくとも1つの数字が含まれていること。
            // 2. 数字とカンマ以外の文字が含まれていないこと。
            // 3. 空行でないこと。
            
            // 以下のパターンは、数字とカンマのみで構成され、少なくとも1つの数字が含まれている行を捉えることを目指す。
            // (?:[0-9](?:,.*)*) : 1つの数字から始まり、カンマと任意の文字が続くパターン。
            // この問題の「カンマ区切りの整数列」の解釈を「数字とカンマのみで構成され、少なくとも1つの数字が含まれている」と解釈する。
            
            // 妥当な行の判定:
            // 1. 行が空でないこと (line.trim().length() > 0)
            // 2. 行に含まれる文字がすべて数字(0-9)またはカンマ(,)であること。
            // 3. 行に少なくとも1つの数字が含まれていること。
            
            boolean isValid = false;
            if (!line.trim().isEmpty()) {
                // 数字とカンマのみで構成されているかチェック
                boolean containsOnlyDigitsAndCommas = true;
                for (int i = 0; i < line.length(); i++) {
                    char c = line.charAt(i);
                    if (!((c >= '0' && c <= '9') || c == ',')) {
                        containsOnlyDigitsAndCommas = false;
                        break;
                    }
                }

                // 少なくとも1つの数字が含まれているかチェック
                boolean containsDigit = false;
                for (int i = 0; i < line.length(); i++) {
                    if (line.charAt(i) >= '0' && line.charAt(i) <= '9') {
                        containsDigit = true;
                        break;
                    }
                }
                
                if (containsOnlyDigitsAndCommas && containsDigit) {
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
