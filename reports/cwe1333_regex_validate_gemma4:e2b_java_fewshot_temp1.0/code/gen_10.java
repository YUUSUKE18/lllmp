import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマを許容するため、trimしてからカンマで分割する
            // 末尾のカンマがあっても、その前に数字が一つ以上あれば分割は成功する
            // ただし、行全体が数字とカンマのみで構成されている必要がある。

            // 妥当性の判定ロジック：
            // 1. 行が空でないこと (上記でチェック済み)
            // 2. 数字とカンマ以外の文字を含まないこと
            // 3. カンマ区切りで1個以上の数字列があること (末尾のカンマは許容される)

            // 末尾のカンマを取り除いて、カンマで分割を試みる
            String content = trimmedLine;
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }

            // カンマで分割
            String[] parts = content.split(",");

            // 妥当な場合は、分割された要素の中に少なくとも1つの数字が含まれている必要がある
            // または、split後の要素が空でないことを確認する。
            
            boolean is_valid = false;
            if (parts.length > 0) {
                // 少なくとも1つの要素が存在すれば、それが数字列（または空文字列）である
                // 課題の要件は「1個以上の数字列がカンマで区切られて並んでいる」であり、
                // 空行や数字とカンマ以外の文字を含まない行のみが妥当である。
                
                // ここでは、入力された行が「数字とカンマのみ」で構成されているかを確認する。
                // カンマで分割した全ての部分が数字であるか、あるいは分割操作自体が意図した形式を満たしているかを評価する。
                
                // 厳密な判定として、行が数字とカンマのみで構成されているかを確認する。
                // trim()で前後の空白を除去した後に、カンマで区切られた要素がすべて整数であることを確認する。

                String reassembled = "";
                boolean allValid = true;
                for (String part : parts) {
                    if (part.isEmpty()) {
                        // カンマが連続している場合 (例: "1,,2" や ",,")
                        // これは「数字列がカンマで区切られて並んでいる」という条件に反する可能性がある
                        // ただし、末尾のカンマは許容されるため、ここでは要素が空でない限りはOKと仮定する。
                        continue;
                    }
                    try {
                        Integer.parseInt(part.trim());
                    } catch (NumberFormatException e) {
                        // 数字以外の文字が含まれていた場合、妥当ではない
                        allValid = false;
                        break;
                    }
                }

                if (allValid) {
                    // 少なくとも1つの有効な数字列が存在すれば妥当
                    // 末尾のカンマが許容されるため、parts.length >= 1 かつ 
                    // 少なくとも1つの要素が数字だった、という条件を満たす。
                    // contentが空文字列でなければ、少なくとも1つの要素がある。
                    if (!content.isEmpty()) {
                        validLines++;
                    } else if (trimmedLine.endsWith(",")) {
                        // 例: "," または "," の場合。これは数字列が0個という状態なので不適。
                        // ただし、課題は「1個以上の数字列」なので、これは不適とする。
                    }
                }
            }
        }

        System.out.println("valid=" + validLines);
    }
}
