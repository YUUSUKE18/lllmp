import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = reader.readLine()) != null) {
            if (isValidLine(line)) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }

    private static boolean isValidLine(String input) {
        // 前後の空白を削除
        String trimmed = input.trim();
        
        // 空行は妥当ではない
        if (trimmed.isEmpty()) {
            return false;
        }
        
        // 数字とカンマ以外の文字が含まれていないか確認
        for (char c : trimmed.toCharArray()) {
            if (!Character.isDigit(c) && c != ',') {
                return false;
            }
        }
        
        // カンマ区切りの整数列として妥当かどうか判定
        // 有効な形式は：[数字, 数字, ...] または [数字, 数字, ..., ] のどちらか
        // 末尾のカンマは許容する場合、空文字列を含む要素に注意が必要
        
        String[] parts = trimmed.split(",");
        
        // すべての要素が整数列（文字列）であるか確認
        for (String part : parts) {
            if (part.isEmpty()) {
                return false;
            }
            if (!isIntegerSequence(part)) {
                return false;
            }
        }
        
        return true;
    }
    
    private static boolean isIntegerSequence(String seq) {
        // 文字列が全て数字であるか確認
        for (int i = 0; i < seq.length(); i++) {
            char c = seq.charAt(i);
            if (!Character.isDigit(c)) {
                return false;
            }
        }
        return true;
    }
}
