import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        boolean valid = false;
        if (line != null) {
            line = line.trim();
            if (line.isEmpty()) valid = false;
            else if (line.matches(".*,.*.*")) valid = true;
        }
        System.out.println("valid=" + valid);
    }
}
