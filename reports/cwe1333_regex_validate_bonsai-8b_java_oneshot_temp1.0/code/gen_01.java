import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int validCount = 0;
        boolean inValidLine = false;
        if (line != null) {
            line = line.trim();
            if (line.isEmpty()) inValidLine = true;
            else {
                String[] parts = line.split(",");
                for (String part : parts) {
                    part = part.trim();
                    if (part.isEmpty()) inValidLine = true;
                    else {
                        try {
                            Integer.parseInt(part);
                            validCount++;
                        } catch (NumberFormatException e) {
                        }
                    }
                }
                if (!inValidLine) validCount = 0;
            }
        }
        System.out.println("valid=" + validCount);
    }
}
