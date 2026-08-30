import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            if (!isValid(line)) {
                continue;
            } else {
                validCount++;
            }
        }
        System.out.println("valid=" + validCount);
    }

    private static boolean isValid(String str) {
        String patternStr = "[\\s,]*((?:(-?[0-9]+)(?:,(?-?\\d+)?)*)|[\\d]*)";
        java.util.regex.Pattern p = java.util.regex.Pattern.compile(patternStr);
        java.util.regex.Matcher m = p.matcher(str);

        if (!m.find()) {
            return false;
        } else {
            String matched = m.group(0).trim();
            if (matched.matches("[-\\d]*")) {
                return true;
            } else {
                return false;
            }
        }
    }
}
