import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        Pattern pattern = Pattern.compile("^\\s*(?:[^,]+|,)+\\s*$");
        
        while ((String line = br.readLine()) != null) {
            if (line.trim().matches(pattern)) {
                validCount++;
            }
        }
        System.out.println("valid=" + validCount);
    }
}
