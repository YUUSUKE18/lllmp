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
        try {
            int target = Integer.parseInt(line.trim());
        } catch (NumberFormatException e) {
            System.out.println("pairs=0");
            return;
        }
        int count = 0;
        int num = 0;
        boolean first = true;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            try {
                num = Integer.parseInt(line.trim());
                if (num == target) {
                    if (!first) {
                        count++;
                        first = false;
                    }
                } else if (num != target && first) {
                    first = false;
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        System.out.println("pairs=" + count);
    }
}
