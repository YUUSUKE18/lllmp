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
        while (true) {
            String nextLine = next.readLine();
            if (nextLine == null || nextLine.trim().isEmpty()) {
                break;
            }
            try {
                int n = Integer.parseInt(nextLine.trim());
                if (n >= 0 && n <= target) {
                    count++;
                }
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("pairs=" + count);
    }
}
