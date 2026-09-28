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
            boolean first = true;
            int[] numbers = new int[100];
            int index = 0;
            for (int i = 0; i < 100; i++) {
                String nextLine = br.readLine();
                if (nextLine == null || nextLine.trim().isEmpty()) continue;
                try {
                    int n = Integer.parseInt(nextLine.trim());
                    if (first || n > target) {
                        first = false;
                    }
                    if (n == target) {
                        if (count == 0) {
                            count = 0;
                        }
                        count++;
                    }
                } catch (NumberFormatException e) {
                    continue;
                }
            }
            if (count >= 2) {
                System.out.println("pairs=" + count);
            } else {
                System.out.println("pairs=0");
            }
        }
    }
}
