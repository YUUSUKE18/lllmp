import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = 0;
        boolean first = true;
        if (line != null) {
            try {
                target = Integer.parseInt(line);
            } catch (NumberFormatException e) {
            }
        }
        int sum = 0;
        int count = 0;
        boolean found = false;
        while (true) {
            line = br.readLine();
            if (line == null || line.trim().isEmpty()) break;
            try {
                int num = Integer.parseInt(line);
                sum += num;
                if (sum == target) {
                    count++;
                    found = true;
                }
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("pairs=" + count);
    }
}
