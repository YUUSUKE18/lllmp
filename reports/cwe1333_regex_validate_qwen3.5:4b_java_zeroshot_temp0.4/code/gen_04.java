import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = reader.readLine()) != null) {
            // 前後の空白を除去
            String trimmedLine = line.trim();
            
            // 空行は妥当ではない
            if (trimmedLine.isEmpty()) {
                continue;
            }
            
            // カンマ区切りの整数列として判定する処理
            // 1. 数字とカンマ以外の文字が含まれていないかチェック
            // 2. 少なくとも 1 つの要素があるかチェック（末尾カンマ含む場合も含む）
            
            boolean isValid = true;
            int commaCount = 0;
            int digitCount = 0;
            int lastCharIndex = trimmedLine.length() - 1;
            
            // 文字列を走査し、有効な数字とカンマかどうかを確認
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (!Character.isDigit(c) && c != ',') {
                    isValid = false;
                    break;
                }
                if (c == ',') {
                    commaCount++;
                } else {
                    digitCount++;
                }
            }
            
            // 数字とカンマ以外の文字が含まれていないことを確認済み
            
            // 要件: 1 個以上の数字列がカンマで区切られて並んでいること
            // 末尾のカンマは許容する。
            // つまり、少なくとも 1 つの数字が存在するか、または「数字、カンマ、数字...」という構造があるか。
            // ただし、「空行（除去後）」は除外済みなので、残った文字列が完全に数字とカンマで構成され、かつ
            // 単一の数字でも OK、複数の数字や末尾カンマでも OK と解釈する。
            // 例外: 「,,,」のようなカンマだけの行は「数字列がない」ため妥当ではない。
            
            if (isValid && digitCount > 0) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
