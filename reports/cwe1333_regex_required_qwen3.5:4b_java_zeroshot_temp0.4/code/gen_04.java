import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line;
        int validCount = 0;
        
        Pattern pattern = Pattern.compile("^\\s*([\\d,]+|[\\d,]+,)?$\\s*$");
        
        while ((line = reader.readLine()) != null) {
            if (pattern.matcher(line).matches()) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
