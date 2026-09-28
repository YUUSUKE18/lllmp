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
            // ^\s* : 行の先頭の空白を許容
            // (?:[0-9]+) : 1つ以上の数字のグループ（非キャプチャ）
            // (?:,\s*(?:[0-9]+))* : カンマとそれに続く空白、そして数字の繰り返し（0回以上）
            // \s*$ : 行末の空白を許容
            // このパターンは、少なくとも1つの数字がカンマで区切られていることを確認します。
            // 末尾のカンマも許容するため、行全体が数字とカンマのみで構成されていることを確認します。
            
            // より厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認するために、
            // 行全体が数字とカンマの組み合わせで構成されていることを確認し、空行と非数字/カンマ文字を除外します。
            
            // 妥当な行の判定ロジックを正規表現で表現します。
            // 1. 行が空でないこと (これはreadLineで既に保証されるが、念のため)
            // 2. 行が数字、カンマ、空白のみで構成されていること
            // 3. 少なくとも1つの数字が含まれていること
            
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 正規表現: 
            // ^\s* : 行頭の空白
            // (?:[0-9]+(?:,\s*[0-9]+)*) : 少なくとも1つの数字列と、それに続くカンマ区切りの数字列のパターン
            // (?:,\s*$) : 末尾のカンマと空白のオプション（末尾のカンマは許容）
            
            // よりシンプルに、行が数字とカンマのみで構成され、かつ少なくとも1つの数字が含まれていることを確認します。
            // 正規表現で「数字とカンマのみ」で構成されているかを確認し、さらに「数字が存在する」ことを確認します。
            
            // 妥当な行の定義: 1個以上の数字がカンマで区切られている。
            // 例: "1,2,3", "1,2,", "100"
            String pattern = "^\\s*(?:[0-9]+(?:,\\s*[0-9]+)*)(?:,\\s*)?$";
            
            // パターンマッチングの実行
            if (Pattern.compile(pattern).matcher(line).matches()) {
                // 正規表現がマッチした場合、行は少なくとも1つの数字とカンマで構成されていると見なす。
                // ただし、この正規表現は、空行や数字とカンマ以外の文字を含む行を弾くのに役立つ。
                validLines++;
            } else {
                // 妥当でない行（数字とカンマ以外を含む、または空行、または数字がないなど）
            }
        }

        System.out.println("valid=" + validLines);
    }
}
