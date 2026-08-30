import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 行の前後の空白を無視する（trim()を使用）
            String trimmedLine = line.trim();

            // 空行の場合は妥当ではない
            if (trimmedLine.isEmpty()) {
                continue;
            }

            // 末尾のカンマは許容する
            // 妥当な行は、数字とカンマのみで構成されている必要がある
            // 少なくとも1個の数字列が存在する必要がある
            
            // 正規表現で検証する: 1つ以上の数字とカンマのみで構成されていること
            // ^[0-9,]*$ : 行が数字とカンマのみで構成されていることを確認
            // (?:[0-9]+(?:,[0-9]+)*) : 少なくとも1つの数字列が存在することを確認
            // $ : 行の終わり
            
            // 仕様の解釈: 「1 個以上の数字列がカンマで区切られて並んでいること」
            // これは、カンマで区切られた数字のシーケンスが存在することを意味します。
            // 例: "1,2,3" -> 3つの数字列
            // 例: "1,2," -> 2つの数字列 (1, 2)
            // 例: "," -> 0個の数字列（空の数字列は許容しない）
            
            // 妥当な行の判定ロジックを再検討します。
            // 「1 個以上の数字列がカンマで区切られて並んでいる」
            // これは、カンマで区切られた要素が数字である必要があることを示唆します。
            
            // 1. 行が数字とカンマのみで構成されているか？
            // 2. 少なくとも1つの数字列が存在するか？
            
            // 以下の正規表現は、数字とカンマのみで構成され、かつ少なくとも1つの数字が含まれていることを確認します。
            // ^[0-9,]*$ : 数字とカンマのみ
            // (?:[0-9]+(?:,[0-9]+)*) : 1つ以上の数字列がカンマで区切られているパターン
            
            // より単純に、カンマで区切られた要素がすべて数字であるかを確認します。
            // 妥当な行は、カンマで区切られた要素がすべて整数である、という解釈で進めます。
            
            // 行をカンマで分割し、各要素が整数であるか、または空でないかを確認するアプローチ。
            
            String[] parts = trimmedLine.split(",");
            boolean isValid = false;
            
            if (parts.length > 0) {
                // 少なくとも1つの要素が存在する
                for (String part : parts) {
                    // 各部分をトリムして、空文字列でないことを確認
                    String trimmedPart = part.trim();
                    if (!trimmedPart.isEmpty()) {
                        try {
                            // 整数に変換可能か試みる
                            Integer.parseInt(trimmedPart);
                        } catch (NumberFormatException e) {
                            // 数字以外の文字が含まれている場合、妥当ではない
                            isValid = false;
                            break;
                        }
                    }
                }
                
                if (isValid) {
                    // 1個以上の数字列がカンマで区切られて並んでいること
                    // これは、少なくとも1つの非空の数字列が存在すれば満たされる。
                    // ただし、空の要素のみ（例: "," や ",,"）は除外されるべき。
                    
                    // 少なくとも1つの非空の要素が存在すればOK
                    boolean hasNumber = false;
                    for (String part : parts) {
                        if (!part.trim().isEmpty()) {
                            hasNumber = true;
                            break;
                        }
                    }
                    
                    if (hasNumber) {
                        validCount++;
                    }
                }
            }
        }

        System.out.println("valid=" + validCount);
        scanner.close();
    }
}
