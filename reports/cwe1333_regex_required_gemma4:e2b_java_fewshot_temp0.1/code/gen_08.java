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
            // ^\s* : 行の先頭の空白を無視
            // (?:[0-9]+(?:,?[0-9]+)*) : 1個以上の数字とカンマの組み合わせ。
            //   (?:...) は非キャプチャグループ。
            //   [0-9]+ : 1つ以上の数字
            //   (?:,?[0-9]+)* : カンマと数字の繰り返し。末尾のカンマも許容する。
            // $ : 行の終わり
            // このパターンは、数字とカンマのみで構成され、少なくとも1つの数字が含まれていることを確認します。
            // 末尾のカンマも許容するため、行全体がこのパターンにマッチする必要があります。
            // ただし、仕様は「1個以上の数字列がカンマで区切られて並んでいる」ことを求めているため、
            // 厳密には「数字とカンマのみで構成され、少なくとも1つの数字が含まれている」ことを確認する必要があります。

            // よりシンプルな判定として、行が空でないこと、そして数字とカンマのみで構成されていることを確認し、
            // 少なくとも1つの数字が含まれていることを確認します。

            // 1. 空行のチェック（行が空でないことを確認）
            if (line.trim().isEmpty()) {
                continue;
            }

            // 2. 数字とカンマのみで構成されているか、および少なくとも1つの数字が含まれているかのチェック
            // 正規表現: ^\s*([0-9,]+)\s*$
            // これは、行が数字とカンマのみで構成されていることを確認します。
            // ただし、"1,2," のようなケースを許容する必要があります。
            
            // 妥当性の定義を再解釈: 1個以上の数字列がカンマで区切られている。
            // これは、カンマで区切られた要素がすべて整数である、ということを意味します。
            // 例: "1,2,3" -> 3つの数字列
            // 例: "1,2," -> 2つの数字列 (1, 2)
            // 例: "abc" -> 不妥当
            // 例: ",," -> 不妥当 (数字列が0個)

            // 妥当な行は、カンマで区切られた要素がすべて整数である、という条件を満たす必要があります。
            // 正規表現で「カンマで区切られた整数列」を判定します。
            // 1個以上の数字列がカンマで区切られていることを確認するには、
            // 少なくとも1つの数字が含まれており、かつ、数字とカンマ以外の文字がないことを確認します。

            // 以下のパターンは、行が数字とカンマのみで構成され、少なくとも1つの数字が含まれていることを確認します。
            // ^\s* : 行頭の空白
            // (?:[0-9]+(?:,|$))+ : 1つ以上の数字列と、それに続くカンマまたは行末
            // $ : 行末
            
            // 簡略化のため、行をカンマで分割し、各要素が整数であるかを確認する方が、
            // 「1個以上の数字列がカンマで区切られている」という仕様に直接対応しやすいです。
            
            String[] parts = line.split(",");
            boolean isValid = false;
            
            if (parts.length > 0) {
                // 少なくとも1つの要素が存在する
                boolean hasNumber = false;
                for (String part : parts) {
                    String trimmedPart = part.trim();
                    if (!trimmedPart.isEmpty()) {
                        try {
                            // 要素が整数であることを確認
                            Integer.parseInt(trimmedPart);
                            hasNumber = true;
                        } catch (NumberFormatException e) {
                            // 数字以外の文字が含まれている場合、この行は不妥当
                            isValid = false;
                            break;
                        }
                    }
                }
                
                // 少なくとも1つの数字列が存在し、かつ、行が数字とカンマのみで構成されていることを確認する。
                // 仕様: 1個以上の数字列がカンマで区切られて並んでいること。
                // 空行は除外済み。
                // 数字とカンマ以外を含む行は不妥当。
                // 末尾のカンマは許容。
                
                // 1. 数字列が1個以上あるか (hasNumber)
                // 2. 数字とカンマ以外を含まないか (上記ループでNumberFormatExceptionが発生しなかったか、および空文字列のみが許容されるか)
                
                // 厳密に「数字とカンマ以外を含む行は妥当ではない」という制約を適用するため、
                // 全ての要素が数字またはカンマのみで構成されているかを確認します。
                
                boolean allValidChars = true;
                for (String part : parts) {
                    for (char c : part.toCharArray()) {
                        if (!((c >= '0' && c <= '9') || c == ',')) {
                            allValidChars = false;
                            break;
                        }
                    }
                    if (!allValidChars) break;
                }
                
                if (hasNumber && allValidChars) {
                    validLines++;
                }
            }
        }

        System.out.println("valid=" + validLines);
    }
}
