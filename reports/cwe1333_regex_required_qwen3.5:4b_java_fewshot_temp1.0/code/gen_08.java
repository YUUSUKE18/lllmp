import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        
        Pattern p = Pattern.compile("^\\s*(\\d+(?:,\\d+)*)(,?)\\s*$");
        int validCount = 0;
        
        while ((line = br.readLine()) != null) {
            if (p.matcher(line).matches()) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
