import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int target = 0;
        try {
            target = Integer.parseInt(line);
        } catch (NumberFormatException e) {
            return;
        }
        int count = 0;
        int first = true;
        int total = 0;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            try {
                int num = Integer.parseInt(line);
                total += num;
                if (first || total == target) {
                    first = false;
                    count++;
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        System.out.println("pairs=" + count);
    }
}
