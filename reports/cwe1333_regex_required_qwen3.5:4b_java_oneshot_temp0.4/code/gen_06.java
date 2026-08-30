import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        Pattern pattern = Pattern.compile("^\\s*([0-9]+(?:,[0-9]+)*)?\\s*$");

        while ((line = br.readLine()) != null) {
            if (pattern.matcher(line).matches()) {
                validCount++;
            }
        }
        System.out.println("valid=" + validCount);
    }
}
