import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視して処理
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマを許容しつつ、カンマ区切りの整数列として妥当かを判定する
            // 妥当な行は、数字とカンマのみで構成され、1個以上の数字列がカンマで区切られていること。
            // 末尾のカンマは許容される。

            // 1. 末尾のカンマを取り除く（許容される場合）
            String content = trimmedLine;
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }

            // 2. カンマで分割して、空でない要素が存在するか確認する
            String[] parts = content.split(",");

            boolean isValid = true;
            if (parts.length == 0) {
                // カンマで区切られた結果が空になることは通常ないが、念のため
                isValid = false;
            } else {
                // 1個以上の数字列がカンマで区切られていることを確認する。
                // parts.length >= 1 は常に真。
                // 妥当であるためには、分割された要素の中に少なくとも1つの有効な整数が存在する必要がある。
                // 仕様：「1 個以上の数字列がカンマで区切られて並んでいること」
                // これは、カンマで区切られた要素がすべて整数である、という暗黙の前提がある。
                // ここでは、要素が空でないことを確認し、その要素が整数であるかをチェックする。
                
                // 厳密な解釈：行全体が「カンマ区切りの整数列」であること。
                // 空行、および数字とカンマ以外を含む行は妥当ではない。
                
                // 以下のチェックで、行が「数字とカンマのみ」で構成されているかを確認する。
                // 1. 数字とカンマ以外が含まれていないか
                for (char c : trimmedLine.toCharArray()) {
                    if (!Character.isDigit(c) && c != ',' && Character.isWhitespace(c)) {
                        isValid = false;
                        break;
                    }
                }
                
                if (isValid) {
                    // 2. 1個以上の数字列がカンマで区切られているか
                    // 最初の行が空でないことが保証されているため、parts.length >= 1 は満たされる。
                    // 妥当であるためには、少なくとも1つの要素が数字列で構成されている必要がある。
                    boolean hasNumber = false;
                    for (String part : parts) {
                        if (!part.trim().isEmpty()) {
                            try {
                                Integer.parseInt(part.trim());
                                hasNumber = true;
                            } catch (NumberFormatException e) {
                                // 数字列でない要素があった場合、これは妥当ではない（上記1のチェックで既に不適格だが、念のため）
                                isValid = false;
                                break;
                            }
                        }
                    }
                    
                    if (hasNumber) {
                        validLines++;
                    } else {
                        // カンマのみ、または空の文字列のみの場合（例: "," や ",,"）
                        isValid = false;
                    }
                }
            }

            if (isValid) {
                // 妥当な行としてカウントされた場合、次の行へ
            }
        }

        System.out.println("valid=" + validLines);
    }
}
