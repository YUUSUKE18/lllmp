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
            // ^\s* : 行の先頭の空白（無視）
            // (?:[\d,]+\s*)* : 数字とカンマのグループが0回以上繰り返される (数字とカンマのみ)
            // [^\n]* : 残りの文字列（実際には、行全体が数字とカンマのみで構成されているかを確認する）
            // $ : 行の終わり
            // 
            // より厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認するために、
            // 行全体が数字、カンマ、空白のみで構成され、最低1つの数字が含まれていることを確認します。

            // 1. 行の前後の空白を無視して、内容をトリムする
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 2. 正規表現で検証: 
            // この行が「カンマ区切りの整数列」であるか？
            // 1個以上の数字列がカンマで区切られていることを確認する。
            // パターン: ^\s*([\d,]+(?:\s*,\s*[\d,]+)*)\s*$
            // これは、行が数字とカンマのみで構成され、カンマで区切られていることを確認します。
            
            // 課題の要求を再解釈: 「1個以上の数字列がカンマで区切られて並んでいること」
            // 例: "1,2,3" -> 3つの数字列
            // 例: "1,2," -> 2つの数字列 (末尾のカンマは許容)
            // 例: "1" -> 1つの数字列
            
            // 許容される形式: 数字とカンマのみで構成され、カンマで区切られている、または単一の数字列。
            // 末尾のカンマは許容。数字とカンマ以外は許容しない。

            // 正規表現: 
            // ^\s* : 行頭の空白
            // (?:[\d]+(?:,[\d]+)*) : 1つ以上の数字列がカンマで区切られているパターン
            // (?:,[\d]*)? : 最後の要素の後にカンマが続く場合（末尾のカンマを許容）
            // \s*$ : 行末の空白
            
            // より簡単な検証として、行が数字、カンマ、空白のみで構成され、
            // 少なくとも1つの数字が含まれていることを確認します。
            
            Pattern pattern = Pattern.compile("^\\s*([\\d, ]+)\\s*$");
            Matcher matcher = pattern.matcher(line);

            if (matcher.matches()) {
                // 形式が数字とカンマと空白のみで構成されている
                
                // 実際にカンマで区切られた数字列が1つ以上あるかチェックする
                // カンマで分割し、空でない要素が存在するか確認する
                String[] parts = line.split(",");
                int actualCount = 0;
                for (String part : parts) {
                    if (!part.trim().isEmpty()) {
                        actualCount++;
                    }
                }
                
                // 1個以上の数字列がカンマで区切られて並んでいること
                if (actualCount >= 1) {
                    validLines++;
                }
            }
        }

        System.out.println("valid=" + validLines);
    }
}
