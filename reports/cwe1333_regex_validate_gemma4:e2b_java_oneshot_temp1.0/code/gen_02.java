import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;

        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // カンマで区切られているか判定する
            // 末尾のカンマは許容するが、全体がカンマのみでないか、数字以外が含まれていないかを確認する
            
            // 妥当な行の判定ロジック:
            // 1. 行が空でないこと。
            // 2. 行がカンマで区切られていること、または数字のみであること。
            // 3. 含まれる要素がすべて整数であること。
            
            // 仕様の解釈に基づき、「1 個以上の数字列がカンマで区切られて並んでいる」ことを確認する。
            // 末尾のカンマは許容される。
            
            boolean isValid = true;
            
            // カンマ区切りのチェックと内容の検証
            if (trimmedLine.endsWith(",")) {
                // 末尾のカンマがある場合、カンマで区切られた部分が空でないか確認する
                String content = trimmedLine.substring(0, trimmedLine.length() - 1);
                if (content.isEmpty()) {
                    // 末尾のカンマのみ（例: ","）は妥当ではない（1個以上の数字列が必須）
                    isValid = false;
                } else {
                    // カンマで区切られた部分をチェック
                    String[] parts = content.split(",");
                    boolean hasDigits = false;
                    for (String part : parts) {
                        String trimmedPart = part.trim();
                        if (!trimmedPart.isEmpty()) {
                            try {
                                Integer.parseInt(trimmedPart);
                                hasDigits = true;
                            } catch (NumberFormatException e) {
                                // 数字以外が含まれていたら不正
                                isValid = false;
                                break;
                            }
                        }
                    }
                    // カンマで区切られていて、少なくとも1つの数字列があったかを確認
                    if (!hasDigits) {
                         isValid = false;
                    }
                }
            } else {
                // 末尾のカンマがない場合も、カンマ区切りとして検証する
                String[] parts = trimmedLine.split(",");
                if (parts.length == 0) {
                    isValid = false; // これはtrimmedLineが空でないため通常発生しないが念のため
                } else {
                    boolean hasDigits = false;
                    for (String part : parts) {
                        String trimmedPart = part.trim();
                        if (!trimmedPart.isEmpty()) {
                            try {
                                Integer.parseInt(trimmedPart);
                                hasDigits = true;
                            } catch (NumberFormatException e) {
                                // 数字以外が含まれていたら不正
                                isValid = false;
                                break;
                            }
                        }
                    }
                    // 少なくとも1つの有効な数字列があったか確認
                    if (!hasDigits) {
                        isValid = false;
                    }
                }
            }


            if (isValid) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
