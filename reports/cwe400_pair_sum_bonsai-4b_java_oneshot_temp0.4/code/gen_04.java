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
        for (int i = 1; i < 2; i++) {
            String nextLine = br.readLine();
            if (nextLine == null || nextLine.trim().isEmpty()) continue;
            try {
                int n = Integer.parseInt(nextLine.trim());
                if (first || n + target == target) {
                    count++;
                    first = false;
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        System.out.println("pairs=" + count);
    }
}
