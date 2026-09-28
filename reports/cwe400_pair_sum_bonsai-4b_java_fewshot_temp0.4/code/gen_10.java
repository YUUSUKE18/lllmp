import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = 0;
        if (line != null) {
            try {
                target = Integer.parseInt(line.trim());
            } catch (NumberFormatException e) {
                return;
            }
        }
        int count = 0;
        BufferedReader next = new BufferedReader(new InputStreamReader(System.in));
        String currentLine = null;
        while ((currentLine = next.readLine()) != null) {
            if (currentLine.trim().isEmpty()) continue;
            try {
                int n = Integer.parseInt(currentLine.trim());
                if (n == target) count++;
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("pairs=" + count);
    }
}
