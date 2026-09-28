import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String firstLine = br.readLine();
        int target = 0;
        if (firstLine != null) {
            try {
                target = Integer.parseInt(firstLine.trim());
            } catch (NumberFormatException e) {
                return;
            }
        }
        int pairs = 0;
        for (int i = 1; i < 2; i++) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) continue;
            try {
                int n = Integer.parseInt(line.trim());
                if (n == target) pairs++;
            } catch (NumberFormatException e) {}
        }
        System.out.println("pairs=" + pairs);
    }
}
