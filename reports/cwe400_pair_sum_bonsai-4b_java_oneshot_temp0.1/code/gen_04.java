import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = 0;
        int count = 0;
        if (line != null) {
            try {
                target = Integer.parseInt(line.trim());
            } catch (NumberFormatException e) {
                return;
            }
            String[] numbers = br.lines().filter(line -> !line.trim()).map(line -> {
                if (line.trim().isEmpty()) return null;
                try {
                    return Integer.parseInt(line.trim());
                } catch (NumberFormatException e) {
                    return null;
                }
            }).filter(Boolean::toBoolean).forEach(n -> {
                if (n == target) count++;
            });
        }
        System.out.println("pairs=" + count);
    }
}
