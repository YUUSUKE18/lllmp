import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        // カンマ区切りの整数列を判定する正規表現:
        // ^\s*       : 行の先頭の空白を許容
        // (?:      : 非キャプチャグループの開始
        //     \d+  : 1桁以上の数字
        //     ,    : カンマ
        // )*       : 上記のグループが0回以上繰り返される (カンマ区切りリストの本体)
        // \s*$      : 行末の空白を許容
        // .*?       : 任意の文字（数字やカンマ以外の文字を含む可能性）
        // この正規表現だけでは「数字とカンマのみ」を厳密にチェックしつつ、
        // 「1個以上の数字列」が区切られているかを確認するロジックが必要になる。
        // 仕様を再解釈すると、「1個以上の数字列がカンマで区切られて並んでいる」こと、
        // および「空行、および数字とカンマ以外を含む行は妥当ではない」という制約から、
        // 行全体が「数字、カンマ、空白」のみで構成され、かつ最低1つの数字列が存在する場合をチェックする。

        // より厳密に「カンマ区切りで1個以上の数字が並んでいる」ことを検証する。
        // 正規表現: ^\s*(\d+(?:,\d+)*)\s*$
        // これは、数字がカンマで区切られているパターン（例: 1,2,3 または 1, 2, 3）にマッチさせることを意図するが、
        // 末尾のカンマの許容や空白の扱いに注意が必要。

        // 仕様に基づき、行を読み込み、各行が以下の条件を満たすかを確認する。
        // 1. 空行でないこと。
        // 2. 数字とカンマのみで構成されていること（空白は無視される）。
        // 3. 1個以上の数字列がカンマで区切られていること。
        
        String line;
        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視して判定
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 正規表現: ^\s* (数字とカンマのみ) .*$ をチェックし、
            // 1個以上の数字列が存在することを保証する。

            // ここでは、入力された行が「カンマで区切られた整数列」の形式を満たすかを検証する。
            // 末尾のカンマは許容されるが、行全体が数字とカンマのみで構成されている必要がある。
            
            // 1. 行が数字とカンマのみで構成されているか、および数字列が存在するかをチェック
            // 数字とカンマのみで構成されていることをチェックするパターン
            // ^[\d,]*$ は、数字とカンマのみで構成されていることを意味する。
            // ただし、行末のカンマの許容、および空白無視を考慮する必要がある。

            // 正規表現: ^\s*[\d,]*\s*$
            // この正規表現は、行が数字、カンマ、空白のみで構成されていることを許容する。
            // この正規表現だけでは「1個以上の数字列がカンマで区切られている」ことを保証しない。

            // 最も簡潔に「1個以上の数字列がカンマで区切られている」ことを検証するアプローチを採用する。
            // 末尾のカンマを除去し、残りがカンマ区切りの整数列であるかをチェックする。
            
            String content = line.trim();
            
            // 末尾のカンマを取り除く処理（末尾のカンマは許容される）
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1).trim();
            }
            
            if (content.isEmpty()) {
                // 末尾がカンマのみ、または空行だった場合（上記で空行は除外済みだが念のため）
                // 1個以上の数字列が区切られていないため、ここでは不適と判断
                continue;
            }
            
            // 区切った文字列が完全に整数列で構成されているかを確認する
            // カンマで区切られた各要素が整数であることを確認する。
            String[] parts = content.split(",");
            
            boolean isValid = true;
            for (String part : parts) {
                if (part.trim().isEmpty()) {
                    // 連続するカンマや不要な空白で空の要素ができた場合（例: ",,"）
                    isValid = false;
                    break;
                }
                try {
                    // 各部分が整数であることを確認
                    Integer.parseInt(part.trim());
                } catch (NumberFormatException e) {
                    // 数字とカンマ以外が含まれていた場合
                    isValid = false;
                    break;
                }
            }

            if (isValid) {
                // 1個以上の数字列がカンマで区切られており、内容が整数である
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
