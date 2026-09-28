import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = 0;
        int pairs = 0;
        if (line != null) {
            try {
                target = Integer.parseInt(line.trim());
            } catch (NumberFormatException e) {
                return;
            }
            BufferedReader next = new BufferedReader(new InputStreamReader(System.in));
            String inputLine;
            while ((inputLine = next.readLine()) != null) {
                if (inputLine.trim().isEmpty()) continue;
                try {
                    int n = Integer.parseInt(inputLine.trim());
                    if (n == target) pairs++;
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
