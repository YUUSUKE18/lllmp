import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        // カンマ区切りの整数列を判定するための正規表現
        // ^\s*                : 行頭の任意の空白
        // (?:             : 非キャプチャグループの開始
        //   \d+           : 1つ以上の数字
        //   ,\s*          : カンマとそれに続く任意の空白
        // )+              : 上記グループが1回以上繰り返される
        // (?:,\s*|\s*$)    : 末尾のカンマと空白、または行末の空白
        // $                : 行末
        // よりシンプルに、「1個以上の数字とカンマの組み合わせ」をチェックする
        // 妥当な形式: 1個以上の数字がカンマで区切られていること。末尾のカンマは許容。
        // 正規表現: ^\s*(\d+(?:,\s*\d+)*)\s*(\s*,?|\s*)$
        // より厳密に「1個以上の数字とカンマの組み合わせ」をチェックするため、
        // 少なくとも一つの数字が含まれ、カンマが使われているパターンを想定する。

        // 妥当性の判定ロジックをシンプルにするため、行が空でないこと、
        // そして数字とカンマのみで構成されていることを確認する。
        // 仕様：「1 個以上の数字列がカンマで区切られて並んでいること」
        // これは、数字とカンマのみで構成され、数字が少なくとも1つあることを意味する。
        
        // 判定正規表現: 少なくとも1つの数字があり、数字とカンマのみで構成されている行。
        // ^\s*             : 行頭の空白
        // (?:             : 非キャプチャグループ
        //     \d+         : 1つ以上の数字
        //     (?:,\s*\d+)*: カンマとそれに続く数字の繰り返し
        // )               : 1個以上の数字列のパターン
        // [\s]*$          : 行末の空白
        
        // より緩く、かつ指定された制約（空行、数字とカンマ以外を含まない）を満たすために、
        // 実際にカンマ区切りの整数列が存在するかどうかをチェックする。
        
        // 妥当な行をカウントする
        for (String line : br.lines().toList()) {
            String trimmedLine = line.trim();
            
            if (trimmedLine.isEmpty()) {
                continue; // 空行は妥当ではない
            }

            // 正規表現で検証：数字とカンマのみで構成されているか、かつ数字が少なくとも1つあるか。
            // 妥当な形式: 1個以上の数字とカンマで構成されている。
            // 例: 1,2,3 または 1,2,3, または 1,2,3,
            
            // パターン: 1つ以上の数字とカンマの組み合わせ（末尾のカンマは許容）
            // 少なくとも1つの数字が、カンマで区切られていることを確認する。
            // ^\s*               : 行頭の空白
            // (?:               : 非キャプチャグループ
            //     \d+           : 1つ以上の数字
            //     (?:,\s*\d+)*  : カンマとそれに続く数字の繰り返し（数字が複数あることを保証）
            // )                 :
            // (?:,\s*|\s*$)      : 末尾のカンマと空白、または行末の空白
            
            // 簡略化のため、まずは数字とカンマのみで構成されているかを確認し、
            // その後、数字の存在をチェックする。
            
            // 1. 数字とカンマ以外が含まれていないかチェック
            boolean containsOnlyDigitsAndCommas = true;
            for (char c : trimmedLine.toCharArray()) {
                if (!Character.isDigit(c) && c != ',' && Character.isWhitespace(c)) {
                    containsOnlyDigitsAndCommas = false;
                    break;
                }
            }

            if (!containsOnlyDigitsAndCommas) {
                continue; // 数字とカンマ以外を含む行は妥当ではない
            }

            // 2. 1個以上の数字列がカンマで区切られているかチェック
            // 末尾のカンマは許容されるため、行をカンマで分割し、要素の数をチェックする。
            String[] parts = trimmedLine.split(",");
            
            // 少なくとも1つの数字列が存在し、それらがカンマで区切られていることを確認する。
            // 1個以上の数字列が区切られている = partsの要素数が1以上（空要素は無視される）
            // ただし、空行をスキップした後の文字列が、数字が1つ以上あることを確認する。
            
            boolean hasAtLeastOneNumber = false;
            for (String part : parts) {
                if (!part.trim().isEmpty()) {
                    try {
                        Integer.parseInt(part.trim());
                        hasAtLeastOneNumber = true;
                        break;
                    } catch (NumberFormatException e) {
                        // これは上記1のチェックで既に除外されているはずだが、念のため
                        hasAtLeastOneNumber = false;
                        break;
                    }
                }
            }

            if (hasAtLeastOneNumber) {
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
