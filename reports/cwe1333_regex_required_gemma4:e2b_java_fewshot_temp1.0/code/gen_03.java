import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        
        while (true) {
            String line = br.readLine();
            if (line == null) {
                break;
            }

            // 正規表現による妥当性の判定
            // \s* は前後の空白を許容
            // (?:[0-9]+) は1個以上の数字
            // (?:,\s*.*)? はカンマとそれに続く任意の文字（末尾のカンマも含む）を0回または1回繰り返す
            // より厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認するため、
            // 少なくとも1つの数字列が含まれていることを確認する必要があります。
            
            // 判定ロジックの微調整：
            // 1. 行が空でないこと。
            // 2. 行が数字とカンマのみで構成されていること。
            // 3. 少なくとも1つの数字列が存在すること。
            
            // 妥当なパターン: 任意の数の数字とカンマのみで構成され、少なくとも1つの数字列を含む。
            // パターン: 任意の文字 (数字またはカンマ) の繰り返しであり、かつ数字が少なくとも1つ存在する。
            // この課題の意図を「カンマ区切りの整数列」が妥当であるかという点に絞るため、
            // 正規表現で「数字とカンマのみで構成され、少なくとも1つの数字が含まれている」ことを確認します。
            
            // より単純な解釈（数字とカンマのみで構成され、数字が一つ以上あるか）を採用します。
            // これは、入力された文字列が、数字とカンマのみで構成され、数字が一つ以上含まれていることを意味します。
            // 末尾のカンマは許容されます。

            boolean isValid = false;
            if (!line.trim().isEmpty()) {
                // 正規表現パターン: 任意の文字（数字またはカンマ）のシーケンスであり、かつ少なくとも1つの数字が含まれている。
                // ^[\d,]*$ は数字とカンマのみで構成されていることを確認するために使えますが、
                // 「カンマで区切られた整数列」という文脈を考えると、内部の構造に注目します。
                
                // 以下のパターンは、行が「数字とカンマのみ」で構成され、数字が少なくとも1つ含まれていることを確認します。
                // \d+ : 1つ以上の数字
                // [,\d]* : ゼロ個以上のカンマまたは数字
                // 厳密に「カンマ区切りの整数列」を判定するため、行全体が数字とカンマのみで構成され、数字が含まれていることを確認します。
                
                // 課題の記述に厳密に従うため、行が「数字とカンマのみ」で構成されており、かつ数字が一つ以上存在することを確認します。
                Pattern p = Pattern.compile("^[0-9,]*$");
                Matcher m = p.matcher(line);
                
                if (m.matches()) {
                    // 数字が含まれているかチェック
                    if (line.matches(".*\\d.*")) {
                        isValid = true;
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
