import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Pattern pattern = Pattern.compile("^\\s*(?:[0-9]+(?:\\s*,\\s*|,)?)?[0-9]+(?:,|)$");

        String line;
        int validCount = 0;
        while ((line = br.readLine()) != null) {
            if (line.isEmpty()) continue;
            if (pattern.matcher(line).matches()) {
                validCount++;
            }
        }
        System.out.println("valid=" + validCount);
    }
}
