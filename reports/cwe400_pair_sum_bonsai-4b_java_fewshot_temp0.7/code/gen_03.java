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
                if (line != null) {
                    try {
                        target = Integer.parseInt(line.trim());
                    } catch (NumberFormatException e) {
                        line = br.readLine();
                        if (line != null) {
                            pairs = 0;
                            while ((ch = br.read()) != -1) {
                                try {
                                    int n = Integer.parseInt(String.valueOf(ch).trim());
                                    if (n > target && n < 2 * target) {
                                        pairs++;
                                    }
                                } catch (NumberFormatException e) {
                                }
                            }
                        }
                    }
                }
            }
        }
        while ((ch = br.read()) != -1) {
            try {
                int n = Integer.parseInt(String.valueOf(ch).trim());
                if (n > target && n < 2 * target) {
                    pairs++;
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
