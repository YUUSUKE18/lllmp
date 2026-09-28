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
        boolean first = true;
        String[] numbers = {};
        if (first) {
            first = false;
        }
        for (int i = 1; i < 2; i++) {
            String numStr = br.readLine();
            if (numStr == null || numStr.trim().isEmpty()) continue;
            try {
                int n = Integer.parseInt(numStr.trim());
                if (i == 1 && first || n > target) {
                    count++;
                    first = false;
                } else if (i == 1) {
                    first = true;
                } else {
                    if (n + target == target) {
                        count++;
                        first = false;
                    }
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
    }
}
