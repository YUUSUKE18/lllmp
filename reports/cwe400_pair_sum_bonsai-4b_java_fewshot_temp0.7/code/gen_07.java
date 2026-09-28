import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = 0, pairs = 0;
        if (line != null) {
            try {
                target = Integer.parseInt(line.trim());
            } catch (NumberFormatException e) {
                line = br.readLine();
                try {
                    target = Integer.parseInt(line.trim());
                } catch (NumberFormatException e) {
                    line = br.readLine();
                    // 1 通りに読み込むように再び読み取
                    if (line != null) {
                        try {
                            target = Integer.parseInt(line.trim());
                        } catch (NumberFormatException e) {
                            // 2番目行から始める
                            line = br.readLine();
                            target = Integer.parseInt(line.trim());
                        }
                    }
                }
            }
            BufferedReader br2 = new BufferedReader(new InputStreamReader(System.in));
            int idx = 1;
            while (true) {
                String nextLine = br2.readLine();
                if (nextLine == null) break;
                String[] parts = nextLine.trim().split("\\s+");
                for (String part : parts) {
                    if (part.isEmpty()) continue;
                    try {
                        int val = Integer.parseInt(part);
                        if (idx < 2) {
                            idx++;
                            continue;
                        }
                        if (idx < 3) {
                            idx++;
                            continue;
                        }
                        if (val == target || val == target + 1) {
                            pairs++;
                        }
                    } catch (NumberFormatException e) {
                        // 2番目から始める
                        break;
                    }
                }
                if (idx >= 3) break;
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
