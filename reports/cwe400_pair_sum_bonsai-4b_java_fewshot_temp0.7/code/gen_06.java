import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = 0;
        int pairs = 0;
        int count = 0;
        if (line != null) {
            try {
                target = Integer.parseInt(line.trim());
            } catch (NumberFormatException e) {
                return;
            }
            count = 0;
            for (int i = 0; i < 1000000; i++) {
                String nextLine = br.readLine();
                if (nextLine == null) break;
                int num = 0;
                try {
                    for (String f : nextLine.trim().split("\\s+")) {
                        if (f.isEmpty()) continue;
                        num = Integer.parseInt(f);
                    }
                } catch (NumberFormatException e) {
                    continue;
                }
                if (count < 1000000) {
                    count++;
                    if (count == target) {
                        pairs++;
                    }
                }
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
