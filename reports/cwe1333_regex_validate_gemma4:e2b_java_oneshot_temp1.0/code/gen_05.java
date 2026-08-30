import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;

        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // カンマ区切りで、1個以上の数字列が存在するか判定する
            // 末尾のカンマは許容する
            boolean isCommaSeparated = false;
            
            // 末尾のカンマを削除して処理
            String content = trimmedLine;
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }

            String[] parts = content.split(",");
            
            // 少なくとも1つの要素があり、かつそれらが全て数字のみ（カンマ以外はスペースも許容しない、という解釈が文脈から推測されるが、
            // 「数字とカンマ以外を含む行は妥当ではありません」という条件を厳密に適用する）
            boolean allPartsAreDigits = true;
            for (String part : parts) {
                if (part.isEmpty()) {
                    // 連続するカンマやカンマの後にカンマが続く場合（例: ",," や "1,,2"）を考慮する必要があるが、
                    // 「1個以上の数字列がカンマで区切られて並んでいる」を重視する。
                    // 厳密に「カンマで区切られた数字列」を意味するなら、各要素が数字である必要がある。
                    continue;
                }
                try {
                    int num = Integer.parseInt(part.trim());
                    // 数字として解析できた。
                } catch (NumberFormatException e) {
                    // 数字以外が含まれていた場合、この行は妥当ではない
                    allPartsAreDigits = false;
                    break;
                }
            }
            
            // 妥当であるためには、少なくとも1つの数字列があり、かつ数字とカンマ以外が含まれていない必要がある。
            // 「1個以上の数字列がカンマで区切られて並んでいる」
            // これは、カンマで区切った結果、少なくとも1つの非空の数字列が存在すれば良い、と解釈する。
            // ただし、"1,," のようなケースは「1個以上の数字列」を満たさないと考える。
            
            // 最もシンプルな判定として、カンマで分割した結果、数字としてパースできた要素が1つ以上あれば妥当とする。
            if (!parts.length == 0) {
                boolean foundNumber = false;
                for (String part : parts) {
                    if (!part.trim().isEmpty()) {
                        try {
                            Integer.parseInt(part.trim());
                            foundNumber = true;
                        } catch (NumberFormatException e) {
                            // 数字以外の要素があれば、妥当ではない（「数字とカンマ以外を含む行は妥当ではありません」の補強）
                            allPartsAreDigits = false;
                            break;
                        }
                    }
                }
                
                if (allPartsAreDigits && foundNumber) {
                    validLines++;
                }
            }
        }

        System.out.println("valid=" + validLines);
    }
}
