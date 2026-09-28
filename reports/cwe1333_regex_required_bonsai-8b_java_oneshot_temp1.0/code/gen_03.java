import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        boolean valid = false;
        if (line != null) {
            if (line.trim().matches("^[\\s]*[0-9]+(?:[\\s]*[0-9]+)*[\\s]*$")) {
                valid = true;
            }
        }
        System.out.println("valid=" + valid);
    }
}
