import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 行の前後の空白を無視するため、trim()を使用
            String trimmedLine = line.trim();
            
            // 1. 空行の判定
            if (trimmedLine.isEmpty()) {
                continue;
            }

            // 2. 数字とカンマ以外を含む行の判定
            boolean containsInvalidChars = false;
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (!Character.isDigit(c) && c != ',') {
                    containsInvalidChars = true;
                    break;
                }
            }
            if (containsInvalidChars) {
                continue;
            }

            // 3. カンマ区切りの整数列であるかどうかの判定
            // 妥当とは、「1個以上の数字列がカンマで区切られて並んでいること」
            
            // 末尾のカンマは許容する。
            // 妥当なケースの例: "1,2,3", "1,2,", "1," (もし行全体がカンマと数字のみで構成されていれば)
            // 妥当でないケースの例: "" (既に除外), "abc", "1a", ",," (空の数字列が連続する場合)

            // カンマで分割して、空でない数字列が1つ以上存在するか確認する。
            String[] parts = trimmedLine.split(",");
            
            boolean isValid = false;
            for (String part : parts) {
                // trim()を適用して、カンマの後に続くスペースなどを考慮
                String trimmedPart = part.trim();
                
                // 空の文字列（連続するカンマや行が空になった場合）は無視する
                if (!trimmedPart.isEmpty()) {
                    try {
                        // その部分が整数であるか確認
                        Integer.parseInt(trimmedPart);
                        // 数字列が存在すれば、それは妥当な形式の一部である
                        isValid = true;
                    } catch (NumberFormatException e) {
                        // これは既に上記のチェックで除外されているはずだが、念のため
                        // 実際には数字とカンマ以外が含まれていなければ、ここでisValidがfalseになることはない。
                        // ただし、仕様は「1個以上の数字列がカンマで区切られて並んでいる」なので、
                        // 少なくとも1つの数字列が意味を持つ必要がある。
                    }
                }
            }

            // 最後のチェック：splitで得られた部分の数が1以上であるか、あるいは数字列が1つ以上存在するか。
            // 最も単純に、もし数字とカンマのみで構成されていれば、その文字列が意味を持つと見なす。
            // 例: "1,2" -> parts=["1", "2"] -> isValid=true
            // 例: "1," -> parts=["1", ""] -> isValid=true (最初の"1"が有効)
            // 例: "," -> parts=["", ""] -> isValid=false (空の数字列しかない)
            
            // 妥当なのは、空行以外で、少なくとも1つの数字がカンマで区切られている場合。
            if (isValid) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
        scanner.close();
    }
}
