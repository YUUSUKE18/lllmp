import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line != null && !line.trim().isEmpty() && !line.trim().startsWith("\\s+") && !line.trim().endsWith("\\s+")) {
            if (line.trim().split("\\s+").length >= 2) {
                System.out.println("valid=" + line.trim().split("\\s+").length);
            }
        }
    }
}
