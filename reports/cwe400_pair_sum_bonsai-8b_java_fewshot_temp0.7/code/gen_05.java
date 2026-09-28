import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }
        int target = Integer.parseInt(line);
        int count = 0;
        int prev = 0;
        boolean first = true;
        while ((line = br.readLine()) != null && !line.trim().isEmpty()) {
            int num;
            try {
                num = Integer.parseInt(line);
            } catch (NumberFormatException e) {
                continue;
            }
            if (num == 0) continue;
            if (!first) {
                for (int i = 0; i < count; i++) {
                    if (prev + num == target) {
                        count++;
                        break;
                    }
                }
            }
            prev = num;
            first = false;
        }
        System.out.println("pairs=" + count);
    }
}
