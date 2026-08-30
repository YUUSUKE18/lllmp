import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
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

    private static boolean isValid(String s) {
        s = s.trim();
        if (s.isEmpty()) {
            return false;
        }
        int i = 0;
        while (i < s.length() && Character.isWhitespace(s.charAt(i))) {
            i++;
        }
        if (i >= s.length()) {
            return false;
        }
        int start = i;
        while (i < s.length()) {
            char c = s.charAt(i);
            if (!Character.isDigit(c)) {
                return false;
            }
            i++;
            if (c == ',') {
                i++;
                while (i < s.length() && Character.isWhitespace(s.charAt(i))) {
                    i++;
                }
            }
        }
        if (i >= s.length()) {
            return false;
        }
        // 末尾のカンマも許容するため、最後の文字がカンマの場合、その後の空白を含めてチェック
        while (i < s.length() && Character.isWhitespace(s.charAt(i))) {
            i++;
        }
        if (i >= s.length()) {
            return true;
        }
        // 最後の数字の後にカンマがある場合
        if (s.charAt(i) == ',') {
            i++;
            while (i < s.length() && Character.isWhitespace(s.charAt(i))) {
                i++;
            }
            if (i >= s.length()) {
                return true;
            }
        }
        return false;
    }
}
