import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        int validCount = 0;

        while ((line = br.readLine()) != null) {
            if (isValidLine(line)) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }

    private static boolean isValidLine(String line) {
        line = line.trim();
        if (line.isEmpty()) {
            return false;
        }

        List<String> parts = new ArrayList<>();
        int start = 0;
        int len = line.length();

        for (int i = 0; i < len; i++) {
            char c = line.charAt(i);
            if (c == ',') {
                if (start >= i) {
                    return false;
                }
                parts.add(line.substring(start, i));
                start = i + 1;
            }
        }

        if (start < len) {
            parts.add(line.substring(start, len));
        }

        for (String part : parts) {
            if (!isNumeric(part)) {
                return false;
            }
        }

        return true;
    }

    private static boolean isNumeric(String s) {
        int len = s.length();
        if (len == 0) return false;
        char first = s.charAt(0);
        if (!Character.isDigit(first)) return false;
        for (int i = 1; i < len; i++) {
            if (!Character.isDigit(s.charAt(i))) {
                return false;
            }
        }
        return true;
    }
}
