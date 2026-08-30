import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        
        // 1行ずつ読み込む
        String line;
        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視して判定する
            String trimmedLine = line.trim();
            
            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }
            
            // 正規表現による妥当性の判定:
            // 1. 1個以上の数字とカンマが連続していること。
            // 2. 数字とカンマ以外の文字が含まれていないこと。
            // 3. 末尾のカンマは許容されること。
            // 正規表現: "^[0-9,]*$" は数字とカンマのみで構成されていることを確認します。
            // より厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認するには、
            // カンマで区切られていることを確認する必要があります。
            
            // 妥当性の定義を再確認:
            // 1 個以上の数字列がカンマで区切られて並んでいる。
            // 末尾のカンマは許容する。
            // 空行、および数字とカンマ以外を含む行は妥当ではない。

            // これは、行が「数字とカンマのみ」で構成されており、少なくとも1つの数字が含まれている、という条件を満たす必要があります。
            
            // 1. 行が数字とカンマのみで構成されているか
            if (!Pattern.matches("^[0-9,]*$", trimmedLine)) {
                continue; // 数字とカンマ以外の文字を含む場合は不妥当
            }
            
            // 2. 少なくとも1つの数字が含まれているか (カンマのみや空文字列は除外)
            // 数字が含まれているかを確認するため、カンマを除去した文字列が空でないことを確認する。
            String digitsOnly = trimmedLine.replace(",", "");
            if (digitsOnly.isEmpty()) {
                continue; // カンマのみの行は妥当ではない
            }
            
            // 3. 妥当な行としてカウント
            validLines++;
        }

        // 結果の出力
        System.out.println("valid=" + validLines);
    }
}
