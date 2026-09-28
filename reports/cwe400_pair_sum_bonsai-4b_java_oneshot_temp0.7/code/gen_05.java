import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = 0;
        if (line != null && !line.trim().isEmpty()) {
            try {
                target = Integer.parseInt(line.trim());
            } catch (NumberFormatException e) {
                return;
            }
        }
        
        int pairs = 0;
        BufferedReader lines = new BufferedReader(new InputStreamReader(System.in));
        String currentLine;
        
        while ((currentLine = lines.readLine()) != null && !currentLine.trim().isEmpty()) {
            try {
                int n = Integer.parseInt(currentLine.trim());
                if (n == target) pairs++;
            } catch (NumberFormatException e) {
            }
        }
        
        System.out.println("pairs=" + pairs);
    }
}
