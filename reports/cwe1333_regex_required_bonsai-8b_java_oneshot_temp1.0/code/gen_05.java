import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int valid = 0;
        if (line != null) {
            String trimmedLine = line.trim();
            if (!trimmedLine.isEmpty()) {
                String[] parts = trimmedLine.split(",");
                for (String part : parts) {
                    if (part.trim().matches("[0-9]+")) {
                        valid++;
                    }
                }
            }
        }
        System.out.println("valid=" + valid);
    }
}
