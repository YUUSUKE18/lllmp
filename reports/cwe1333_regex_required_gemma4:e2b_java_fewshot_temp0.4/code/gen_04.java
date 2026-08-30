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
            // ^\s*          -> 行の先頭の空白文字 (無視される)
            // (?:[0-9]+,\s*)* -> 1個以上の数字とカンマのグループ (0回以上繰り返す)
            // [0-9]+       -> 少なくとも1つの数字 (必須)
            // .*           -> 残りの文字 (末尾のカンマなども含む)
            // $            -> 行の終わり
            //
            // より厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認するために、
            // 以下のパターンを考えます。
            // 1. 行が空でないこと。
            // 2. 行が数字とカンマのみで構成されていること。
            // 3. 少なくとも1つの数字が含まれていること。
            // 4. 末尾のカンマは許容されること。

            // 1. 空行のチェック (行全体が空白のみの場合)
            if (line.trim().isEmpty()) {
                continue;
            }

            // 2. 数字とカンマのみで構成されているか、かつ少なくとも1つの数字が含まれているかを確認
            // パターン: 任意の文字（数字、カンマ、空白）が0回以上続き、かつ少なくとも1つの数字が含まれていること。
            // 厳密に「1個以上の数字列がカンマで区切られて並んでいる」を判定するため、
            // 以下のロジックで、カンマ区切りの整数列として妥当かを判定します。

            // 処理対象の文字列をトリムして、数字とカンマのみで構成されているかを確認します。
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }

            // 正規表現で、数字とカンマのみで構成されていることを確認する
            // 任意の文字（数字、カンマ、空白）が0回以上続き、かつ少なくとも1つの数字が含まれていること。
            // この問題の意図を「カンマ区切りの整数列」として解釈し、
            // 「数字とカンマ以外の文字が含まれていないこと」と「少なくとも1つの数字があること」をチェックします。

            // 判定ロジックを再考:
            // 「1 個以上の数字列がカンマで区切られて並んでいる」
            // これは、文字列が数字とカンマのみで構成され、かつカンマで区切られている（または区切りの可能性がある）ことを意味します。
            // 末尾のカンマは許容されます。

            // 以下のパターンは、数字とカンマのみで構成され、少なくとも1つの数字が含まれていることを確認します。
            // ^\s*             -> 行頭の空白
            // (?:[0-9]+,\s*)*  -> 0個以上の「数字 + カンマ + 空白」の繰り返し
            // [0-9]+          -> 少なくとも1つの数字
            // .*              -> 残りの文字（末尾のカンマなど）
            // $               -> 行末
            // このパターンは複雑すぎるため、より単純に「数字とカンマ以外の文字がないこと」と「数字が1つ以上あること」をチェックします。

            // 簡略化されたチェック:
            // 1. 行に含まれる文字が、数字、カンマ、空白のみであること。
            // 2. その行に少なくとも1つの数字が含まれていること。
            // 3. 末尾のカンマは許容される。

            boolean isValid = true;
            int digitCount = 0;
            boolean hasDigit = false;

            for (int i = 0; i < line.length(); i++) {
                char c = line.charAt(i);
                if (Character.isDigit(c)) {
                    digitCount++;
                    hasDigit = true;
                } else if (c != ',' && Character.isWhitespace(c)) {
                    // 数字でもカンマでもない文字（例: アルファベットなど）があれば不正
                    isValid = false;
                    break;
                }
            }

            if (isValid && hasDigit) {
                // 少なくとも1つの数字が含まれており、数字とカンマ以外は含まれていない。
                // 末尾のカンマは許容されるため、この条件で妥当と見なす。
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
