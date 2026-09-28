import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line != null && !line.trim().isEmpty()) {
            if (line.trim().matches("^\\d+\\d*(?:,\\d+\\d*)*$")) {
                System.out.println("valid=1");
            } else {
                System.out.println("valid=0");
            }
        } else {
            System.out.println("valid=0");
        }
    }
}
