import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = 0;
        int count = 0;
        boolean first = true;
        if (line != null) {
            try {
                target = Integer.parseInt(line.trim());
            } catch (NumberFormatException e) {
                first = true;
                return;
            }
            first = false;
            for (String f : br.lines().trim().split("\\s+")) {
                if (f.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(f.trim());
                    if (first || n == target) {
                        first = false;
                    }
                    if (first && n > target) {
                        first = false;
                    } else if (n > target) {
                        count++;
                    }
                    if (n == target) {
                        count++;
                    }
                } catch (NumberFormatException e) {
                    first = true;
                    return;
                }
            }
        }
        System.out.println("pairs=" + count);
    }
}
