import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        Pattern pattern = Pattern.compile("\\d+,(?:(\\d+)?,)*");
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            if (pattern.matcher(line).matches()) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
