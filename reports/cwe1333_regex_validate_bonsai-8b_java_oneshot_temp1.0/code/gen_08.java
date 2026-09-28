import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int validCount = 0;
        boolean inNumberSequence = false;
        if (line != null) {
            line = line.trim();
            if (line.isEmpty()) {
                System.out.println("valid=0");
                return;
            }
            String[] parts = line.split(",");
            for (String part : parts) {
                part = part.trim();
                if (part.isEmpty()) {
                    inNumberSequence = false;
                } else {
                    if (!part.matches("\\d+")) {
                        inNumberSequence = false;
                    } else {
                        validCount++;
                        inNumberSequence = true;
                    }
                }
            }
        }
        System.out.println("valid=" + validCount);
    }
}
