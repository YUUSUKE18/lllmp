import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            if (line.matches("^[\\s]*[0-9]+(?:,[\\s]*[0-9]+)*[,\\s]*$")) {
                validCount++;
            }
        }
        System.out.println("valid=" + validCount);
    }
}
