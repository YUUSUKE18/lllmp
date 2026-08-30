import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        int count = 0;
        
        Pattern pattern = Pattern.compile("^\\s*(\\d+)(?:,(\\d+)*)?\\s*$");
        
        while ((line = br.readLine()) != null) {
            if (pattern.matcher(line).matches()) {
                count++;
            }
        }
        
        System.out.println("valid=" + count);
    }
}
