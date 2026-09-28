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
                target = Integer.parseInt(line.trim());
            } catch (NumberFormatException e) {
                return;
            }
            first = false;
            int count = 0;
            BufferedReader inner = new BufferedReader(new InputStreamReader(System.in));
            while (true) {
                String next = inner.readLine();
                if (next == null) break;
                if (next.trim().isEmpty()) continue;
                try {
                    int x = Integer.parseInt(next.trim());
                    if (x == target || x == 0) {
                        if (first || count == 1) count = 1;
                        else if (count == 0) count = 2;
                        else if (count == 1) count = 2;
                    } else if (x == target || x == 0) {
                        if (first || count == 1) count = 1;
                        else if (count == 0) count = 2;
                    } else {
                        if (count == 1) count = 1;
                        else if (count == 2) count = 2;
                    }
                } catch (NumberFormatException e) {
                    break;
                }
            }
        }
        System.out.println("pairs=" + count);
    }
}
