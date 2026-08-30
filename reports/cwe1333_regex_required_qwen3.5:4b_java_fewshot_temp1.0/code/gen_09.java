import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Pattern pattern = Pattern.compile("^\\s*(?:-?[0-9]+(?:\\s*,\\s*-?[0-9]+)*|,)+$");
        
        int validLines = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            if (pattern.matcher(line).matches()) {
                validLines++;
            }
        }
        
        System.out.println("valid=" + validLines);
    }
}
