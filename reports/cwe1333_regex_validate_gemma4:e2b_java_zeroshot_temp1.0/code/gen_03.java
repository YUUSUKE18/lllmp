import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            // 行の前後の空白を無視するため、トリムする
            String trimmedLine = line.trim();

            // 空行の場合は妥当ではない
            if (trimmedLine.isEmpty()) {
                continue;
            }

            // 末尾のカンマが許容されるため、末尾のカンマを取り除く
            String content = trimmedLine;
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }

            // カンマ区切りの整数列が1個以上存在するかをチェック
            // カンマで分割し、空の要素がないか確認する
            String[] parts = content.split(",");

            boolean isValid = false;
            for (String part : parts) {
                // 各部分が空でなければ、それは有効な数字列と見なせる
                if (!part.isEmpty()) {
                    // さらに、その部分がすべて整数であることを確認する（仕様上は「整数列」とあるので、ここでは数字のみをチェック）
                    // ただし、仕様の要求は「1 個以上の数字列がカンマで区切られて並んでいること」なので、
                    // カンマで区切られた文字列が空でない、という条件で十分と解釈する。
                    // 数字のみが期待されるため、数字以外が含まれていないかチェックする。
                    try {
                        Integer.parseInt(part);
                        isValid = true;
                        break; // 1つでも有効な部分があればOK
                    } catch (NumberFormatException e) {
                        // 数字以外のものが含まれていれば、その行は不適
                        // ただし、厳密には「数字列」が区切られていることを意味するため、
                        // 各部分が数字である必要がある。ここでは、数字以外の文字が含まれていれば失敗とする。
                        // 厳密な「整数列」の定義に従い、各部分が整数であるかを確認する。
                        // 仕様: 「1 個以上の数字列がカンマで区切られて並んでいること」
                        // これは、カンマで区切られた要素がすべて整数である、と解釈するのが最も自然。
                        // 空の文字列（trim後の部分が空）でないことを確認済み。
                        // ここで数字以外の文字が含まれているかをチェックする。
                        // 例: "a,1" -> parts=["a", "1"]。"a"は整数列ではない。
                        // したがって、各部分が整数である必要がある。
                        isValid = false; // この部分は実際にはループを抜ける前に判定されるべきだが、シンプルにするため再評価
                    }
                }
            }
            
            // 再度、より厳密なチェック：すべての部分が整数であるかを確認する
            // 空行や数字とカンマ以外を含む行は妥当ではない、という条件を考慮する。
            // これは、カンマで区切られた各要素が「整数列」であることを意味する。
            
            boolean strictlyValid = true;
            if (parts.length == 0) {
                // これは既にtrimmedLine.isEmpty()で排除されているはずだが、念のため
                strictlyValid = false;
            } else {
                for (String part : parts) {
                    if (part.isEmpty()) {
                        // カンマが連続している場合 (例: "1,,2") は妥当ではないと解釈できる
                        strictlyValid = false;
                        break;
                    }
                    try {
                        Integer.parseInt(part);
                    } catch (NumberFormatException e) {
                        // 整数でない文字が含まれている
                        strictlyValid = false;
                        break;
                    }
                }
            }

            if (strictlyValid) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
        scanner.close();
    }
}
