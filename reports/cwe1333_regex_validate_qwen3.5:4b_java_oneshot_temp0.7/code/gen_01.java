import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }
            
            // 数字とカンマ以外を含む行は妥当ではないため、チェックする
            boolean hasInvalidChar = false;
            for (char c : line.toCharArray()) {
                if (!Character.isDigit(c) && c != ',') {
                    hasInvalidChar = true;
                    break;
                }
            }
            
            if (hasInvalidChar) {
                continue;
            }
            
            // 空白のみで区切られた場合など、本来は数値が存在しないケースを考慮
            // しかし仕様は「数字列がカンマで区切られて並んでいる」ことと「末尾のカンマ許容」のみ。
            // 空文字列または空白のみが含まれる行は妥当ではないため、分割してチェックする。
            
            String[] parts = line.split(",");
            for (String part : parts) {
                part = part.trim();
                if (part.isEmpty()) {
                    hasInvalidChar = true; // 空の要素があれば数字列として不適
                    break;
                }
                try {
                    Integer.parseInt(part);
                } catch (NumberFormatException e) {
                    hasInvalidChar = true; // 数値ではない文字列が含まれている
                    break;
                }
            }
            
            if (!hasInvalidChar) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
