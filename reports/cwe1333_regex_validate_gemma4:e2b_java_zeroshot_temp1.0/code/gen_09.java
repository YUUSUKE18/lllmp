import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validLines = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 行の前後の空白を無視する
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマを許容するため、最後にカンマがあればそれを除去して評価する
            String content = trimmedLine;
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }

            // カンマで区切られた整数列を検証する
            // 妥当であるためには、少なくとも1つの数字列が存在し、その間にカンマで区切られている必要がある。
            // ただし、仕様の「1 個以上の数字列がカンマで区切られて並んでいることです」を満たす必要がある。
            // これは、カンマが少なくとも1つ存在し、その結果、数字列が生成されることを意味する。
            
            // 最も厳密な解釈: カンマで区切られた複数の数値が含まれている必要がある。
            // 例: "1,2,3" -> 3つの数値列
            // 例: "1," -> 1つの数値列 (末尾のカンマが許容されるため、これは1つの数値列として扱うか、
            // または "1," の後に何も続かないのは妥当か？)

            // 仕様の解釈を再検討: 「1 個以上の数字列がカンマで区切られて並んでいる」
            // これは、カンマが区切りとして機能していることを意味する。
            // 例: "1" は1つの数字列。カンマがないため、これは「1 個」と解釈すべきか？
            // 例: "1,2" は2つの数字列。
            // 例: "1,2," は2つの数字列（"1"と"2"）と末尾のカンマ。

            // 妥当である条件: 
            // 1. 数字とカンマ以外を含まない。
            // 2. 1個以上の数字列がカンマで区切られている。
            
            // 数字のみを抽出してカンマで分割してみる
            String[] parts = content.split(",");
            
            // 抽出された部分がすべて数字のみで構成されているか確認し、
            // 少なくとも1つの有効な数字列が存在するかを確認する。

            boolean allValid = true;
            if (parts.length == 0) {
                // これは trim() 処理と末尾カンマ処理で既に除外されているはずだが、念のため
                allValid = false;
            } else {
                for (String part : parts) {
                    // 各部分が空でないこと、かつすべて数字であることを確認
                    if (part.isEmpty()) {
                        // カンマが連続している場合（例: "1,,2" や ",1"）
                        allValid = false;
                        break;
                    }
                    // 部分が整数であることを確認
                    try {
                        Integer.parseInt(part);
                    } catch (NumberFormatException e) {
                        // 数字以外の文字が含まれていた場合
                        allValid = false;
                        break;
                    }
                }
            }

            if (allValid) {
                // 1個以上の数字列がカンマで区切られている必要がある。
                // したがって、parts.length >= 1 であり、かつ、区切りとしてカンマが存在していることが重要。
                // "1" (parts.length=1) は、カンマ区切りではないため、妥当ではないと解釈する。
                // "1," -> content="1" -> parts=["1"]。これは1つの数字列のみ。
                
                // 妥当であるためには、少なくとも1つのカンマが存在し、複数の数字列が区切られている必要がある。
                // または、区切り文字が存在する行のみを妥当とする。
                if (content.contains(",")) {
                     validLines++;
                } else {
                    // カンマが存在しないが、数字のみの行 (例: "123") は妥当ではない
                    // 仕様：「1 個以上の数字列がカンマで区切られて並んでいること」
                    // 区切りがないため、これは不成立と判断。
                }
            }
        }

        System.out.println("valid=" + validLines);
        scanner.close();
    }
}
