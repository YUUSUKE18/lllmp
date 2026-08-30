import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validLines = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 行の前後の空白を無視
            String trimmedLine = line.trim();

            // 1. 空行の判定
            if (trimmedLine.isEmpty()) {
                continue;
            }

            // 2. 正規表現による妥当性の判定
            // 正規表現の解説:
            // ^               : 行の先頭
            // [0-9,]+         : 1桁以上の数字またはカンマの繰り返し（数字列が1つ以上あることを保証）
            // (?:,\d*)*       : カンマとそれに続く任意の数の数字（カンマ区切りのグループ。非キャプチャグループ）
            // $               : 行の末尾
            // この正規表現は「1個以上の数字列がカンマで区切られて並んでいる」ことを確認したいが、
            // 仕様に基づくと「1個以上の数字列がカンマで区切られて並んでいる」という形式をチェックする。
            // 具体的には、数字とカンマだけが含まれ、かつ少なくとも1つの数字が含まれている必要がある。

            // より簡潔に、行が数字とカンマだけで構成されていることを確認し、数字が少なくとも1つあることを確認する。
            // 数字とカンマのみで構成され、かつ少なくとも1つの数字が含まれているか？
            // (\\d+)(?:,\\d+)*   -> 少なくとも1つの数字で始まり、その後カンマ区切りの数字が続くパターン
            // (\\d)(?:,\\d*)*    -> 任意の数字で始まり、その後カンマ区切りの数字が続くパターン (末尾のカンマを許容するため)

            // 仕様: 1 個以上の数字列がカンマで区切られて並んでいる。末尾のカンマは許容。
            // 例: "1,2,3" や "1,2," や "1"

            // パターン: 数字とカンマのみで構成され、かつ少なくとも1つの数字が含まれている。
            // (\\d)(?:,\\d*)*    -> 1つ以上の数字で始まり、その後カンマ区切りの数字が続く。
            // ただし、"1" のような単一の数字も許容される。
            
            // 妥当なパターン: 1つ以上の数字がカンマで区切られていること。
            // これは、数字とカンマのみで構成されており、空でないことを意味する。
            // 以下のパターンは、「数字」または「数字とカンマの組み合わせ」の繰り返しを許容する。
            String regex = "^[0-9,]+$";

            if (Pattern.matches(regex, trimmedLine)) {
                // さらに厳密に「1 個以上の数字列がカンマで区切られて並んでいる」をチェックする。
                // これは、少なくとも1つの数字が含まれていることを意味する。
                if (trimmedLine.contains(String.valueOf(trimmedLine.replaceAll(",", ""))) && !trimmedLine.matches("^,+$")) {
                    validLines++;
                }
            }
        }

        System.out.println("valid=" + validLines);
        scanner.close();
    }
}
