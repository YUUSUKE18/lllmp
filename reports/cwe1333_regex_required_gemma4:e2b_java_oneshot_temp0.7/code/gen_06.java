import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 正規表現パターン: 
            // ^\s*       : 行の先頭の任意の空白文字
            // (?:[0-9]+,\s*)* : 1個以上の数字とカンマのグループ。数字とカンマの後に任意の空白が続く
            // [0-9]+     : 最後の数字列
            // (?:,\s*|$)  : カンマと空白、または行末
            // $          : 行末
            // このパターンは「1個以上の数字列がカンマで区切られて並んでいること」を厳密に表現するのは複雑なので、
            // 以下のロジックで判定します。
            
            // 妥当性の判定ロジック:
            // 1. 行が空でないこと。
            // 2. 行が数字とカンマのみで構成されていること。
            // 3. 末尾のカンマは許容されること。
            
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 正規表現による検証: 
            // ^[0-9]+(?:,[0-9]+)*$
            // これは「1つ以上の数字」で始まり、その後「カンマと数字」が0回以上繰り返される、という構造をチェックします。
            // ただし、末尾のカンマが許容されるため、より柔軟なチェックが必要です。
            
            // 妥当な形式の例: "1,2,3" または "1,2,"
            // 妥当でない例: "abc", "1,a", "1,,2" (連続カンマは許容しないと仮定)
            
            // 妥当な行の定義: 
            // 1. 数字とカンマのみで構成されている
            // 2. 少なくとも1つの数字が含まれている
            
            boolean isValid = false;
            if (trimmedLine.matches("^[0-9,]*$")) {
                // 数字とカンマのみで構成されている
                // さらに、数字が少なくとも1つ含まれているかチェックする
                if (trimmedLine.matches(".*[0-9].*")) {
                    // 1つ以上の数字が含まれている
                    isValid = true;
                } else if (trimmedLine.matches(",*")) {
                    // カンマのみ（例: "," または ",," など）は妥当ではない
                    isValid = false;
                }
            }

            // 厳密な正規表現で「1個以上の数字列がカンマで区切られている」ことを確認
            // (?:[0-9]+(?:,[0-9]+)*) を使って、数字がカンマで区切られていることを確認
            Pattern pattern = Pattern.compile("^[0-9]+(?:,[0-9]+)*$");
            
            // 末尾のカンマを許容するため、パターンを調整
            // 妥当な形式: (数字,数字)*数字または(数字,数字)*
            // 1. 少なくとも一つの数字が存在し、数字とカンマのみで構成されている
            
            // 柔軟な判定：カンマで区切られた数字のシーケンスが存在するかどうか
            // 1. 行が空でない
            // 2. 行に含まれる文字が数字とカンマのみである
            // 3. 行がカンマで区切られた数字のセットを表現している（少なくとも1つの数字がある）
            
            // 最終的な判定は、行がカンマ区切りの整数列であり、少なくとも1つの整数が含まれているか、という点に絞る。
            
            // 行がカンマで区切られた整数列のパターンを再定義:
            // 任意の数の数字とカンマが混在しているが、数字のみで構成されている行を対象とする。
            // 1. 数字とカンマのみで構成されていること
            // 2. 少なくとも1つの数字が含まれていること
            
            // 末尾のカンマを許容するため、行全体が数字とカンマで構成されているかをチェックし、
            // その中で数字が一つ以上存在するかを確認する。
            
            boolean isFormatValid = true;
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (!((c >= '0' && c <= '9') || c == ',')) {
                    isFormatValid = false;
                    break;
                }
            }
            
            if (isFormatValid) {
                // 数字が少なくとも1つ存在するかチェック
                boolean hasDigit = false;
                for (int i = 0; i < trimmedLine.length(); i++) {
                    if (trimmedLine.charAt(i) >= '0' && trimmedLine.charAt(i) <= '9') {
                        hasDigit = true;
                        break;
                    }
                }
                if (hasDigit) {
                    validCount++;
                } else {
                    // 数字が一つもない場合 (例: "," や ",," など) は妥当ではない
                    // このケースは上記isFormatValidのチェックでカバーされるべきだが、念のため
                }
            }
        }

        System.out.println("valid=" + validCount);
    }
}
