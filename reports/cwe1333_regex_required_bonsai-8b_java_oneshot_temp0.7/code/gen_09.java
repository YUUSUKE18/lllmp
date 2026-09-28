import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int valid = 0;
        boolean validLine = false;
        if (line != null) {
            line = line.trim();
            if (!line.isEmpty()) {
                String[] parts = line.split(",");
                for (String part : parts) {
                    part = part.trim();
                    if (!part.isEmpty() && part.matches("\\d+")) {
                        valid++;
                        validLine = true;
                    }
                }
            }
        }
        System.out.println("valid=" + valid);
    }
}
