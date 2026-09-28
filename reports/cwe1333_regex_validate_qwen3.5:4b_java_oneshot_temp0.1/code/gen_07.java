import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            if (isValid(line)) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }

    private static boolean isValid(String line) {
        if (line == null || line.isEmpty()) {
            return false;
        }
        
        String trimmed = line.trim();
        if (trimmed.isEmpty()) {
            return false;
        }
        
        // 空白以外の文字が含まれていないか確認（カンマと数字のみ）
        for (int i = 0; i < trimmed.length(); i++) {
            char c = trimmed.charAt(i);
            if (!Character.isDigit(c) && c != ',') {
                return false;
            }
        }
        
        // カンマ区切りの整数列として妥当か確認
        // 末尾のカンマは許容されるため、分割時に空要素が生成されても OK とする必要がある
        String[] parts = trimmed.split(",");
        
        for (String part : parts) {
            if (part.isEmpty()) {
                continue; // 連続したカンマや末尾のカンマによる空文字列は許容
            }
            try {
                Integer.parseInt(part);
            } catch (NumberFormatException e) {
                return false;
            }
        }
        
        return true;
    }
}
