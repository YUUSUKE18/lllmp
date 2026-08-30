import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 行の前後の空白を無視する (trim)
            String trimmedLine = line.trim();

            // 1. 空行の判定
            if (trimmedLine.isEmpty()) {
                continue;
            }

            // 2. 数字とカンマ以外を含む行の判定
            // 妥当な行は「1個以上の数字列がカンマで区切られて並んでいる」
            // これは、行がカンマで区切られた数字のみで構成されている必要があることを意味する。
            
            // 行がカンマのみで構成されているか、または数字とカンマのみで構成されているかをチェックする。
            // 妥当な行の定義: 1個以上の数字列がカンマで区切られて並んでいること。
            // これは、行が数字とカンマのみで構成され、少なくとも1つの数字が含まれている必要がある。
            
            boolean isValid = false;
            
            // 行をカンマで分割してチェック
            // 末尾のカンマは許容されるため、単純にカンマで分割する。
            String[] parts = trimmedLine.split(",");
            
            // 妥当な行の条件を満たすかチェック
            // 1. parts の要素が少なくとも1つあること (これは空行チェックで既に除外されているが念のため)
            // 2. 各要素が数字列であること (数字列が空でないこと)
            // 3. 少なくとも1つの要素が存在すること (1個以上の数字列)
            
            if (parts.length > 0) {
                // 最後の要素が空文字列であっても許容される（末尾のカンマが許容されるため）
                // 例: "1,2," -> parts = ["1", "2", ""]
                
                // 妥当な行とは、「1個以上の数字列がカンマで区切られて並んでいる」こと。
                // これは、カンマで区切られた要素のうち、数字として有効なものが1つ以上存在すれば良い、と解釈する。
                
                boolean containsNumber = false;
                for (String part : parts) {
                    String trimmedPart = part.trim();
                    if (!trimmedPart.isEmpty()) {
                        // 要素が完全に整数であるかチェック
                        try {
                            Integer.parseInt(trimmedPart);
                            containsNumber = true;
                        } catch (NumberFormatException e) {
                            // 数字以外が含まれている場合は不妥当
                            isValid = false;
                            break;
                        }
                    }
                }
                
                if (containsNumber) {
                    isValid = true;
                }
            }
            
            if (isValid) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
        scanner.close();
    }
}
