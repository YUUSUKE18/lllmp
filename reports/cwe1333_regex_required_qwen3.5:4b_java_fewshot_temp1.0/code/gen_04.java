import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int valid = 0;
        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            if (java.util.regex.Pattern.matches("^[\\s]*[1-9][0-9]*(?:,[1-9][0-9]*)*[\\s]*$", line)) {
                valid++;
            }
        }
        System.out.println("valid=" + valid);
    }
}
