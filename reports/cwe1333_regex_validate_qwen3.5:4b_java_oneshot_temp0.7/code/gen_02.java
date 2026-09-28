import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        List<String> lines = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) {
            lines.add(line);
        }

        int validCount = 0;
        for (String input : lines) {
            if (isCorrectFormat(input)) {
                validCount++;
            }
        }
        System.out.println("valid=" + validCount);
    }

    private static boolean isCorrectFormat(String line) {
        String trimmed = line.trim();
        if (trimmed.isEmpty()) {
            return false;
        }
        int index = 0;
        while (index < trimmed.length()) {
            char c = trimmed.charAt(index);
            if (!Character.isDigit(c)) {
                return false;
            }
            while (index < trimmed.length() && Character.isDigit(trimmed.charAt(index))) {
                index++;
            }
            if (index >= trimmed.length()) {
                break; // 数字のみの場合 OK
            }
            if (trimmed.charAt(index) != ',') {
                return false;
            }
            index++;
        }
        return true;
    }
}
