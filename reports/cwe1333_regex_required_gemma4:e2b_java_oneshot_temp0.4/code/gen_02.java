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

            // 正規表現パターン: 
            // ^\s* : 行頭の任意の空白
            // (?:[0-9]+(?:,[0-9]+)*) : 1つ以上の数字とカンマの組み合わせ (数字が1つ以上続く)
            // (?:,|$) : カンマまたは行末の終端
            // \s*$ : 行末の任意の空白
            // このパターンは、カンマ区切りの整数列が1つ以上存在することをチェックするために、
            // 厳密には「1個以上の数字列がカンマで区切られている」ことを確認する必要があります。
            
            // 妥当性の判定ロジック:
            // 1. 行が空でないこと。
            // 2. 行が数字とカンマのみで構成されていること。
            // 3. 少なくとも1つの数字列が存在すること。
            
            // 正規表現で「1個以上の数字列がカンマで区切られている」ことを確認する。
            // パターン: ^\s*(?:[0-9]+(?:,[0-9]+)*)\s*$: 
            // ^\s* : 行頭の空白
            // (?:[0-9]+(?:,[0-9]+)*) : 1つ以上の数字とカンマの組み合わせ (例: 1,2,3 または 1,2,3,)
            // \s*$ : 行末の空白
            
            // 末尾のカンマは許容されるため、行末にカンマが続くパターンも考慮します。
            // 少なくとも1つの数字列が存在し、それらがカンマで区切られていることを確認します。
            
            // 厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認する正規表現を試みます。
            // 数字の列が少なくとも1つあり、その間にカンマが0個以上あることを許容します。
            // 例: "1,2,3" または "1,2," または "1" (末尾のカンマは許容)
            
            // 妥当な行の条件:
            // 1. 行が空でない。
            // 2. 行が数字とカンマのみで構成されている。
            // 3. 数字の少なくとも1つが含まれている。
            
            // より簡単な判定として、行をトリムし、カンマで分割した結果、数字のみの要素が1つ以上あるかを確認します。
            
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue; // 空行は妥当ではない
            }

            // カンマで分割し、各要素が数字のみで構成されているか、または数字列が存在するかを確認
            String[] parts = trimmedLine.split(",");
            boolean isValid = false;
            
            for (String part : parts) {
                String trimmedPart = part.trim();
                if (trimmedPart.isEmpty()) {
                    // カンマが連続している場合（例: ",,"）や、末尾のカンマのみの場合を考慮
                    continue;
                }
                
                // 各部分が整数のみで構成されているかチェック
                if (trimmedPart.matches("\\d+")) {
                    isValid = true;
                } else {
                    // 数字とカンマ以外を含む行は妥当ではない
                    isValid = false;
                    break;
                }
            }
            
            // 妥当な行の判定：少なくとも1つの数字列が存在し、数字とカンマ以外を含まないこと。
            // 末尾のカンマは許容されるため、空の文字列が一つ以上存在しても、数字列が一つ以上あればOKとする。
            // ただし、「1個以上の数字列がカンマで区切られて並んでいる」という条件を満たす必要がある。
            
            // 最終的な判定は、数字とカンマ以外の文字が含まれていないこと、および数字が1つ以上存在すること。
            boolean containsDigits = false;
            for (String part : parts) {
                String trimmedPart = part.trim();
                if (trimmedPart.matches("\\d+")) {
                    containsDigits = true;
                } else if (!trimmedPart.isEmpty()) {
                    // 数字とカンマ以外が含まれている場合
                    isValid = false;
                    break;
                }
            }
            
            if (containsDigits) {
                // 数字列が1つ以上存在し、数字とカンマ以外が含まれていない
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
