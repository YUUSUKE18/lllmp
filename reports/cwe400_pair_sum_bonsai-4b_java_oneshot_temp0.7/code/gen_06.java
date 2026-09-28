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
            boolean validLine = true;
            for (int i = 1; i <= 1000000; i++) {
                String s = br.readLine();
                if (s == null || s.trim().isEmpty()) continue;
                try {
                    int n = Integer.parseInt(s.trim());
                    if (n == target || n > target) {
                        if (first || n > target) {
                            count = 1;
                            first = false;
                        } else {
                            count++;
                        }
                    }
                } catch (NumberFormatException e) {
                    validLine = false;
                }
            }
        }
        if (validLine) {
            System.out.println("pairs=" + count);
        } else {
            System.out.println("pairs=0");
        }
    }
}
