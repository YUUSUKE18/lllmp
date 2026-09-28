import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = 0;
        int count = 0;
        if (line != null) {
            try {
                target = Integer.parseInt(line.trim());
            } catch (NumberFormatException e) {
                return;
            }
        }
        BufferedReader next = new BufferedReader(new InputStreamReader(System.in));
        String inputLine = null;
        while ((inputLine = next.readLine()) != null) {
            try {
                int n = Integer.parseInt(inputLine.trim());
                if (n == target) {
                    count++;
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        System.out.println("pairs=" + count);
    }
}
