import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = Integer.parseInt(line.trim());
        int count = 0;
        boolean first = true;
        if (line != null) {
            for (String f : line.trim().split("\\s+")) {
                if (f.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(f);
                    if (first || n > target) { target = n; first = false; }
                } catch (NumberFormatException e) {
                }
            }
            int remaining = target;
            for (int i = 0; i < line.trim().split("\\s+").length - 1; i++) {
                for (int j = i + 1; j < line.trim().split("\\s+").length; j++) {
                    if (Integer.parseInt(line.trim().split("\\s+")[i]) + Integer.parseInt(line.trim().split("\\s+")[j]) == target) {
                        count++;
                    }
                }
            }
        }
        System.out.println("pairs=" + count);
    }
}
