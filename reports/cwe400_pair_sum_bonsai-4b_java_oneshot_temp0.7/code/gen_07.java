import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = 0;
        if (line != null && !line.isEmpty()) {
            target = Integer.parseInt(line.trim());
        }
        int count = 0;
        String firstLine = null;
        boolean first = true;
        try {
            for (int i = 0; i < br.lines().length; i++) {
                String line = br.lines().get(i);
                if (line.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(line.trim());
                    if (first || n == target) {
                        first = false;
                    }
                    if (first && n == target) {
                        count++;
                        first = false;
                    }
                } catch (NumberFormatException e) {
                    continue;
                }
            }
        } catch (Exception e) {
            return;
        }
        System.out.println("pairs=" + count);
    }
}
