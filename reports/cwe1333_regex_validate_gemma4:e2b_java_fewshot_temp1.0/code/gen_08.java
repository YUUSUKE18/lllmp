import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視するため、trim()を使用
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマを許容する場合、行をカンマで分割する
            // ただし、行全体が数字とカンマだけで構成されている必要がある。
            // 末尾のカンマがある場合、split(",")の結果の最後の要素は空文字列になる。
            String[] parts = trimmedLine.split(",");

            if (parts.length == 0) {
                // これはtrimmedLineが空の場合で除外されているはずだが念のため
                continue;
            }

            boolean isStrictlyValid = true;
            for (String part : parts) {
                // 各部分が空文字列でないこと（カンマの連続や、数字以外が含まれていないことを確認するため）
                // 仕様では「1 個以上の数字列がカンマで区切られて並んでいること」が求められている。
                // 数字列のみで構成されていることを確認する。
                if (part.isEmpty()) {
                    // 末尾のカンマが原因で空文字列が発生する場合（例: "1,2," -> ["1", "2", ""]）
                    // 末尾のカンマは許容されるため、最後の要素が空でも問題ない。
                    // ただし、仕様にある「数字とカンマ以外を含む行は妥当ではない」を満たす必要がある。
                    // ここでは、空文字列が途中に存在しないことを確認する。
                } else {
                    // 数字列であるか確認
                    try {
                        Integer.parseInt(part);
                    } catch (NumberFormatException e) {
                        // 数字とカンマ以外を含む場合は妥当ではない
                        isStrictlyValid = false;
                        break;
                    }
                }
            }

            // 妥当な行の判定基準を再評価する:
            // 1. 空行は除外 (既に処理済み)
            // 2. 数字とカンマ以外を含む行は不適
            // 3. 1個以上の数字列がカンマで区切られていること (空行でない、かつ数字のみで構成されていること)

            // 厳密に「1 個以上の数字列がカンマで区切られて並んでいること」をチェックする。
            // これは、行がカンマで分割された結果、少なくとも一つの有効な整数が含まれていることを意味する。
            // また、行に含まれる文字が数字とカンマのみであることを確認する必要がある。

            // 最も単純な解釈: 行がカンマで区切られた後、空でない要素が一つ以上あり、かつそれらが全て整数である。
            // また、行全体が数字とカンマのみで構成されていること。
            
            // 空でない要素が1つ以上あり、かつそれらが全て整数であること。
            boolean hasValidNumbers = false;
            for (String part : parts) {
                if (!part.isEmpty()) {
                    try {
                        Integer.parseInt(part);
                        hasValidNumbers = true;
                    } catch (NumberFormatException e) {
                        // 数字以外の文字が含まれていたため、この行は不妥当
                        hasValidNumbers = false; // 失敗した時点で全体として不妥当と見なす
                        break;
                    }
                }
            }
            
            if (hasValidNumbers) {
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
