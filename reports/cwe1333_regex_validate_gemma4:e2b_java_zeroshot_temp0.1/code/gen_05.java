import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 行の前後の空白を無視する（trim()を使用）
            String trimmedLine = line.trim();

            // 1. 空行の判定
            if (trimmedLine.isEmpty()) {
                continue;
            }

            // 2. 数字とカンマ以外を含む行の判定
            // 妥当な行は「1個以上の数字列がカンマで区切られて並んでいる」こと。
            // これは、行が数字とカンマのみで構成されていることを意味する。
            // ただし、空行は除外されているため、ここでは数字とカンマのみで構成されているかを確認する。
            
            boolean isValid = true;
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (!Character.isDigit(c) && c != ',') {
                    isValid = false;
                    break;
                }
            }

            if (!isValid) {
                continue;
            }

            // 3. カンマ区切りの整数列の妥当性の判定
            // 妥当とは、「1個以上の数字列がカンマで区切られて並んでいること」
            // 末尾のカンマは許容される。
            
            // 処理を簡略化するため、行をカンマで分割し、各要素が空でないかを確認する。
            // ただし、仕様は「1個以上の数字列がカンマで区切られて並んでいる」なので、
            // 少なくとも1つの数字列が存在すれば良い。
            
            // 末尾のカンマを考慮して、行を処理する。
            String content = trimmedLine;
            
            // 末尾のカンマがあれば取り除く（後続の処理を単純化するため）
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }
            
            // カンマで分割
            String[] parts = content.split(",");
            
            // 妥当性の判定: 1個以上の数字列がカンマで区切られていること。
            // これは、分割された配列の要素がすべて空でないこと、または少なくとも1つの要素があることを意味する。
            // ただし、"1," や "," のようなケースも考慮する必要がある。
            
            // 例: "1,2,3" -> ["1", "2", "3"] (長さ3) -> 妥当
            // 例: "1," -> "1" (末尾のカンマ除去後) -> ["1"] (長さ1) -> 妥当
            // 例: "," -> "" (末尾のカンマ除去後) -> [""] (長さ1) -> 不妥当 (空の要素が1つ)
            // 例: "" (空行) -> 既に除外済み
            
            // 妥当なのは、分割された要素の数が1以上であり、かつ、その要素が数字列であること。
            // 最初のチェックで数字とカンマ以外がないことを確認済み。
            
            // 最後のチェックとして、分割された要素の数が1以上であるかを確認する。
            // ただし、"1" のような単一の数字列も妥当である。
            
            // 最初のチェックで、行が数字とカンマのみで構成されていることが保証されている。
            // したがって、カンマで分割した結果、少なくとも1つの非空の文字列が得られれば妥当である。
            
            boolean hasContent = false;
            for (String part : parts) {
                if (!part.isEmpty()) {
                    hasContent = true;
                    // さらに、その部分が本当に整数列であるかを確認する（仕様上は数字のみで構成されているはずだが、念のため）
                    try {
                        Integer.parseInt(part);
                    } catch (NumberFormatException e) {
                        // これは最初のチェックで既に排除されているはずだが、念のため
                        isValid = false;
                        break;
                    }
                }
            }

            if (hasContent) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
        scanner.close();
    }
}
